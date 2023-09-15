package edu.clarivate.foodapp.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.clarivate.foodapp.entity.User;
import edu.clarivate.foodapp.repository.UserRepository;

@Repository
public class UserDao {
	@Autowired
    private UserRepository userRepository;
    
    public User saveUser(User user) {
    	return userRepository.save(user);
    }
    
    public void deleteUserById(int userid) {
        userRepository.deleteById(userid);
    }
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);    
    }
    public List<User> getAllUser(){
        return userRepository.findAll();
    }
    
    public List<User> getAllStaff(){
    	return userRepository.getAllStaff();
    }
    public User getLoginAuth(String email, String password) {
    	return userRepository.getLoginAuth(email, password);
    }
}
