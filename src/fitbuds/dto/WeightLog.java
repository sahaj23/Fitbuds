package fitbuds.dto;

import java.sql.Date;

public class WeightLog {
	private float weight;
	private Date date;
	
	
	public WeightLog() {
	}
	
	public WeightLog(float weight, Date date) {
		this.weight = weight;
		this.date = date;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
}
