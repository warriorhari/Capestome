package edu.clarivate.foodapp.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.clarivate.foodapp.entity.Item;
import edu.clarivate.foodapp.repository.ItemRepository;

@Repository
public class ItemDao {
	@Autowired
	private ItemRepository itemRepository;
	
	public Item saveItem(Item item) {
		return itemRepository.save(item);
	}
	
	public List<Item> getAllItemWithOrderId(int orderid){
		return itemRepository.getItemByOrderId(orderid);
	}
}
