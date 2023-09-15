package edu.clarivate.foodapp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Menu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	@OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<FoodProduct> foodProduct;

	@OneToOne
	@JoinColumn
	@JsonIgnore
	private User user;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<FoodProduct> getFoodProduct() {
		return foodProduct;
	}

	public void setFoodProduct(List<FoodProduct> foodProduct) {
		this.foodProduct = foodProduct;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
}
