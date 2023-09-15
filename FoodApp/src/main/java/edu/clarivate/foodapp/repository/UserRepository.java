package edu.clarivate.foodapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.clarivate.foodapp.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	@Query("SELECT u FROM User u WHERE role = 'staff'")
	List<User> getAllStaff();
	
	@Query("SELECT u FROM User u WHERE email = :email AND password = :password")
	User getLoginAuth(@Param("email") String email,@Param("password") String password);

}
