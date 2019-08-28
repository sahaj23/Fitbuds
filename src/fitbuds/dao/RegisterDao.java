package fitbuds.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import fitbuds.dbutil.DBConnection;
import fitbuds.dto.User;
import fitbuds.dto.UserDetails;

public class RegisterDao {
	public static boolean registerBasicDetails(User user) throws SQLException {
		PreparedStatement ps =DBConnection.getConnection().prepareStatement("insert into user_details(first_name,last_name,email,password) values(?,?,?,?)");
		ps.setString(1, user.getFirstName());
		ps.setString(2, user.getLastName());
		ps.setString(3, user.getEmail());
		ps.setString(4, user.getPassword());
		
		return ps.executeUpdate() == 1;
	}
	public static boolean isEmailRegistered(String email) throws SQLException {
		PreparedStatement ps = DBConnection.getConnection().prepareStatement("Select email from user_details where email = ? ");
		ps.setString(1, email);
		return ps.executeQuery().next();
	}
	public static boolean registerAdvanceDetails(UserDetails user) throws SQLException {
		PreparedStatement ps = DBConnection.getConnection().prepareStatement("update user_details set dob = ? , height = ?, weight = ?, activity_level = ?");
		ps.setDate(1, user.getDob());
		ps.setFloat(2, user.getHeight());
		ps.setFloat(3, user.getWeight());
		ps.setInt(4, user.getActivityLevel());
		//	return ps.executeUpdate() == 1;
		return true;
	}
}
