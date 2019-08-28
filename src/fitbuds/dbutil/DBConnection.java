package fitbuds.dbutil;

import java.sql.Connection;

public class DBConnection {
	private static Connection conn;     
	
	public static void setConnection(Connection connection) {
		conn = connection;
	}
    public static Connection getConnection() {
        return conn;
    }
}
