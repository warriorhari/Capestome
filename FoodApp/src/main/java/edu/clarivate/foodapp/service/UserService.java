package edu.clarivate.foodapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.clarivate.foodapp.dao.FoodOrderDao;
import edu.clarivate.foodapp.dao.MenuDao;
import edu.clarivate.foodapp.dao.UserDao;
import edu.clarivate.foodapp.entity.Menu;
import edu.clarivate.foodapp.entity.User;
import edu.clarivate.foodapp.util.ResponseStructure;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	@Autowired 
	private MenuDao menuDao;
	@Autowired
	private FoodOrderDao foodOrderDao;
	
	public ResponseEntity<ResponseStructure<User>> createManager(User manager) {
		manager.setRole("manager");
		User createdManager =  userDao.saveUser(manager);
		Menu menu = new Menu();
		menu.setUser(createdManager);
		menuDao.createMenu(menu);
		
		ResponseStructure<User> responseStructure = new ResponseStructure<>();
		responseStructure.setError(true);
		responseStructure.setMessage("manager created and initialised with empty menu");
		responseStructure.setData(createdManager);
		return new ResponseEntity<ResponseStructure<User>>(responseStructure, HttpStatus.CREATED);
    }
	
	
	public ResponseEntity<ResponseStructure<User>> createStaff(int managerid, User staff) {
		Menu menu = menuDao.getMenuByUserId(managerid);
		staff.setRole("staff");
		staff.setMenu(menu);
		
		ResponseStructure<User> responseStructure = new ResponseStructure<>();
		responseStructure.setError(true);
		responseStructure.setMessage("staff created and joined with menu");
		responseStructure.setData(userDao.saveUser(staff));
		
		return new ResponseEntity<ResponseStructure<User>> (responseStructure, HttpStatus.OK);
	}
	//code for me
	public ResponseEntity<ResponseStructure<List<User>>> getAllUser(){
		List<User> users = userDao.getAllUser();
		ResponseStructure<List<User>> responseStructure = new ResponseStructure<>();
		responseStructure.setData(users);
		if (users.isEmpty()) {
			responseStructure.setError(true);
			responseStructure.setMessage("no user found");
			return new ResponseEntity<ResponseStructure<List<User>>> (responseStructure, HttpStatus.NO_CONTENT);
		}
		else {
		responseStructure.setError(false);
		responseStructure.setMessage("list of all users");
		return new ResponseEntity<ResponseStructure<List<User>>> (responseStructure, HttpStatus.OK);
		}
	}
    
	public ResponseEntity<ResponseStructure<User>> getUserById(int userid) {
		Optional<User> found=userDao.getUserById(userid);
		ResponseStructure<User> responseStructure = new ResponseStructure<>();
		if(found.isPresent()) {
			responseStructure.setError(false);
			responseStructure.setMessage("data found");
			responseStructure.setData(found.get());
			return new ResponseEntity<ResponseStructure<User>>(responseStructure, HttpStatus.OK);
		}
		else {
			responseStructure.setError(true);
			responseStructure.setMessage("not found");
			responseStructure.setData(null);
			
			return new ResponseEntity<ResponseStructure<User>>(responseStructure, HttpStatus.NO_CONTENT);
		}
	}
	
	public  ResponseEntity<ResponseStructure<List<User>>> getAllStaff() {
		List<User> users = userDao.getAllStaff();
		ResponseStructure<List<User>> responseStructure = new ResponseStructure<>();
		responseStructure.setData(users);
		if (users.isEmpty()) {
			responseStructure.setError(true);
			responseStructure.setMessage("no staff found");
			return new ResponseEntity<ResponseStructure<List<User>>> (responseStructure, HttpStatus.NO_CONTENT);
		}
		else {
		responseStructure.setError(false);
		responseStructure.setMessage("list of all staff");
		return new ResponseEntity<ResponseStructure<List<User>>> (responseStructure, HttpStatus.OK);
		}
	}
	
	public ResponseEntity<ResponseStructure<User>> updateUser(int userid, User user) {
		User existingUser = userDao.getUserById(userid).get();
		BeanUtils.copyProperties(user, existingUser, "id", "password" ,"role", "menu");
		
		ResponseStructure<User> responseStructure = new ResponseStructure<>();
		responseStructure.setError(true);
		responseStructure.setMessage("user updated");
		responseStructure.setData(userDao.saveUser(existingUser));
		return new ResponseEntity<ResponseStructure<User>>(responseStructure,HttpStatus.OK);
	}
	
    public  ResponseEntity<ResponseStructure<String>> deleteUserById(int userId) {
    	ResponseStructure<String> responseStructure = new ResponseStructure<>();
//    	int x = foodOrderDao.updateUserIdToNull(userId);
//    	System.out.println(x);
    	userDao.deleteUserById(userId); 
    	responseStructure.setError(false);
    	responseStructure.setMessage("user deleted");
    	responseStructure.setData("User with "+ userId+" deleted");
    	return new ResponseEntity<ResponseStructure<String>>(responseStructure, HttpStatus.OK);    		
    	
    }
    
    public ResponseEntity<ResponseStructure<User>> loginAuth(User user){
    	User checkuser = userDao.getLoginAuth(user.getEmail(), user.getPassword());
    	if (checkuser == null) {
    		ResponseStructure<User> responseStructure = new ResponseStructure<>();
    		responseStructure.setError(false);
    		responseStructure.setMessage("no user found");
    		responseStructure.setData(checkuser);
    		
    		return new ResponseEntity<ResponseStructure<User>> (responseStructure, HttpStatus.NOT_FOUND);
    	}
    	else {
    		ResponseStructure<User> responseStructure = new ResponseStructure<>();
    		responseStructure.setError(true);
    		responseStructure.setMessage("user found");
    		responseStructure.setData(checkuser);
    		return new ResponseEntity<ResponseStructure<User>> (responseStructure, HttpStatus.OK);
    	}	
    }
}
