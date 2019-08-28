package fitbuds.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import fitbuds.dto.*;

import fitbuds.dbutil.DBConnection;

public class LogDao {
	
	public static ArrayList<WeightLog> getWeightLog(String email) throws SQLException {
		PreparedStatement ps = DBConnection.getConnection().prepareStatement("Select weight,date from weight_log where email = ?");
		ps.setString(1, email);
		ResultSet rs = ps.executeQuery();
		ArrayList<WeightLog> log = new ArrayList<>();
		while(rs.next()) {
			log.add(new WeightLog(rs.getFloat(1),rs.getDate(2)));
		}
		return log;
	}
}
