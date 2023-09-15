package edu.clarivate.foodapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.clarivate.foodapp.entity.FoodProduct;

public interface FoodProductRepository extends JpaRepository<FoodProduct, Integer>{
	@Query("SELECT fp FROM FoodProduct fp WHERE id = :menu_id")
	List<FoodProduct> getFoodProductByMenuId(@Param("menu_id") int menu_id);
}
