package fitbuds.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import fitbuds.dto.*;
import fitbuds.dao.LogDao;
import fitbuds.dao.LoginDao;
import fitbuds.dao.LoginDao;
import fitbuds.dto.User;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Got in LoginServlet");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		if(password.isEmpty()) {
			//gmail login
		}
		else {
			//normal login
			User user = new User(email, password);
			try {
				if(LoginDao.login(user)) {
					HttpSession sess = request.getSession();
					user = LoginDao.getUser(email);
					sess.setAttribute("user", user);
					ArrayList<WeightLog> log = LogDao.getWeightLog(email);
					sess.setAttribute("weightLog", log);
					
					RequestDispatcher rd = request.getRequestDispatcher("dashboard/index.jsp");
					rd.forward(request, response);
				}
				else {
					response.getWriter().println("Login Failed Fail");
				}
			} catch(SQLException ex) {
				ex.printStackTrace();
			}
		}
	}
}
