package fitbuds.dto;

import java.sql.Blob;
import java.sql.Date;

public class UserDetails {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Date dob;
	private float height;
	private float weight;
	private Blob profilePic;
	private char gender;
	private int activityLevel;
	private float recommendedCalorie;
	private String dietPlanId;
	private String workoutPlanId;
	
	public UserDetails() {
	}
	
	public UserDetails(String firstName, String lastName, String email, String password, Date dob, float height,
			float weight, Blob profilePic, char gender, int activityLevel, float recommendedCalorie, String dietPlanId,
			String workoutPlanId) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.dob = dob;
		this.height = height;
		this.weight = weight;
		this.profilePic = profilePic;
		this.gender = gender;
		this.activityLevel = activityLevel;
		this.recommendedCalorie = recommendedCalorie;
		this.dietPlanId = dietPlanId;
		this.workoutPlanId = workoutPlanId;
	}

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public float getHeight() {
		return height;
	}
	public void setHeight(float height) {
		this.height = height;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public Blob getProfilePic() {
		return profilePic;
	}
	public void setProfilePic(Blob profilePic) {
		this.profilePic = profilePic;
	}
	public char getGender() {
		return gender;
	}
	public void setGender(char gender) {
		this.gender = gender;
	}
	public int getActivityLevel() {
		return activityLevel;
	}
	public void setActivityLevel(int activityLevel) {
		this.activityLevel = activityLevel;
	}
	public float getRecommendedCalorie() {
		return recommendedCalorie;
	}
	public void setRecommendedCalorie(float recommendedCalorie) {
		this.recommendedCalorie = recommendedCalorie;
	}
	public String getDietPlanId() {
		return dietPlanId;
	}
	public void setDietPlanId(String dietPlanId) {
		this.dietPlanId = dietPlanId;
	}
	public String getWorkoutPlanId() {
		return workoutPlanId;
	}
	public void setWorkoutPlanId(String workoutPlanId) {
		this.workoutPlanId = workoutPlanId;
	}
	@Override
	public String toString() {
		return "UserDetails [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", password="
				+ password + ", dob=" + dob + ", height=" + height + ", weight=" + weight + ", gender=" + gender
				+ ", activityLevel=" + activityLevel + ", recommendedCalorie=" + recommendedCalorie + ", dietPlanId="
				+ dietPlanId + ", workoutPlanId=" + workoutPlanId + "]";
	}
}