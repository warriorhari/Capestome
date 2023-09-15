package edu.clarivate.foodapp.repository;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.clarivate.foodapp.entity.FoodOrder;
//import edu.clarivate.foodapp.entity.FoodProduct;
import jakarta.transaction.Transactional;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Integer>{
//	@Modifying
//	@Transactional
//	@Query("UPDATE FoodOrder SET user_id = NULL WHERE user_id = :id")
//	Integer updateOrderWithUserIdNull(@Param("id") int id);
}
