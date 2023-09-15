package edu.clarivate.foodapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.clarivate.foodapp.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer>{
	@Query("SELECT m FROM Menu m WHERE id= :user_id")
	Menu getMenuByUserId(@Param("user_id") int user_id);
}
