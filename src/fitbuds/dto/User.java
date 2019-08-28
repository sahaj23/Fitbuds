package fitbuds.dto;

import java.sql.Blob;

public class User {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private float weight;
	private Blob profilePic;
	private float recommendedCalorie;
	private String dietPlanId;
	private String workoutPlanId;
	
	public User() {
	}
	public User(String firstName,String lastName, String email, String password, float weight, Blob profilePic,
			float recommendedCalorie, String dietPlanId, String workoutPlanId) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.weight = weight;
		this.profilePic = profilePic;
		this.recommendedCalorie = recommendedCalorie;
		this.dietPlanId = dietPlanId;
		this.workoutPlanId = workoutPlanId;
	}
	public User(String email, String password) {
		this.email = email;
		this.password = password;
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
		return "User [firstName=" + firstName + ", email=" + email + ", password=" + password + ", weight=" + weight
				+ ", recommendedCalorie=" + recommendedCalorie + ", dietPlanId=" + dietPlanId + ", workoutPlanId="
				+ workoutPlanId + "]";
	}
}
