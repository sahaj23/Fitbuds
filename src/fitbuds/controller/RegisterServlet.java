package fitbuds.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import fitbuds.dao.RegisterDao;
import fitbuds.dto.User;
import fitbuds.dto.UserDetails;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Got here in Register Servlet");
		if(request.getParameter("dob") == null) {
			String firstName = request.getParameter("firstName");
			String lastName = request.getParameter("lastName");
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			
			User user = new User();
			user.setFirstName(firstName);
			user.setLastName(lastName);
			user.setEmail(email);
			user.setPassword(password);
			try {
				if(!RegisterDao.isEmailRegistered(email)) {
					if(RegisterDao.registerBasicDetails(user)) {
						RequestDispatcher rd = request.getRequestDispatcher("/dashboard/register-next.html");
						rd.forward(request, response);
					}
				}
				else {
					response.getWriter().println("Email Already Registered.Use Different Email");
				}
			} catch(SQLException ex) {
				ex.printStackTrace();
			}
		} else {
			String dob = request.getParameter("dob");
			String height = request.getParameter("height");
			String weight = request.getParameter("weight");
			String activityLevel = request.getParameter("activityLevel");
			
			try {
				UserDetails user = new UserDetails();
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				java.util.Date d= sdf.parse(dob);
				user.setDob(new java.sql.Date(d.getTime()));
				user.setHeight(Float.parseFloat(height));
				user.setWeight(Float.parseFloat(weight));
				user.setActivityLevel(Integer.parseInt(activityLevel));
				
				if(RegisterDao.registerAdvanceDetails(user)) {
					response.sendRedirect("/FitBuds/dashboard/login.html");
				}
				else {
					response.getWriter().println("Last Incomplete Registration found with this email.Please Delete last incomplete Entry From DB and then Register");
				}
			} catch(SQLException ex) {
				ex.printStackTrace();
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
	}

}
