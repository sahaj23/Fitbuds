package fitbuds.dao;

import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import fitbuds.dbutil.DBConnection;
import fitbuds.dto.User;

public class LoginDao {

	public static boolean login(User user) throws SQLException {
		PreparedStatement ps;
		ps = DBConnection.getConnection()
				.prepareStatement("Select * from user_details where email = ? and password = ?");
		ps.setString(1, user.getEmail());
		ps.setString(2, user.getPassword());
		return ps.executeQuery().next();
	}

	public static User getUser(String email) throws SQLException {
		PreparedStatement ps;
		ps = DBConnection.getConnection().prepareStatement(
				"Select first_name,last_name, email, password,weight,profile_pic, recommended_calorie, diet_plan_id,"
						+ " workout_plan_id from user_details where email = ? ");
		ps.setString(1, email);
		ResultSet rs = ps.executeQuery();
		rs.next();
		return new User(rs.getString(1),rs.getString(2), rs.getString(3), rs.getString(4), rs.getFloat(5), rs.getBlob(6),
				rs.getFloat(7), rs.getString(8), rs.getString(9));
		
	}
}
