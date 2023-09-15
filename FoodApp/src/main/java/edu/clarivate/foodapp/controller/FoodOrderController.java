package edu.clarivate.foodapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.clarivate.foodapp.dao.FoodOrderDao;
import edu.clarivate.foodapp.entity.FoodOrder;
import edu.clarivate.foodapp.service.FoodOrderService;
//import edu.clarivate.foodapp.service.FoodProductService;
import edu.clarivate.foodapp.util.ResponseStructure;

@RestController
@CrossOrigin
public class FoodOrderController {
	@Autowired
	private FoodOrderService foodOrderService;
	@Autowired
	private FoodOrderDao foodOrderDao;
	
	@PostMapping("createOrder/{staffid}")
	public ResponseEntity<ResponseStructure<FoodOrder>> createOrder(@PathVariable int staffid, @RequestBody FoodOrder foodOrder) {
		return foodOrderService.createOrder(staffid, foodOrder);
	}
	
	@PutMapping("updateStatus")
	public ResponseEntity<ResponseStructure<FoodOrder>> updateStatus(@RequestBody FoodOrder foodOrder) {
		return foodOrderService.updateOrderStatus(foodOrder);
	}
	
	@GetMapping("foodorder")
	public ResponseEntity<ResponseStructure<List<FoodOrder>>> getAllOrder() {
		return foodOrderService.getAllFoodOrder();
	}
	
	@GetMapping("foodorder/{orderid}")
	public FoodOrder getById(@PathVariable int orderid) {
		return foodOrderService.getFoodOrderById(orderid);
	}
	
	@DeleteMapping(value = "foodorder/{id}")
	public ResponseEntity<ResponseStructure<String>> deleteUser(@PathVariable int id) {
		return foodOrderService.deleteProduct(id);
	}
	
	
}
