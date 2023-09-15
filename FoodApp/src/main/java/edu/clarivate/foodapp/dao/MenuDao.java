package edu.clarivate.foodapp.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.clarivate.foodapp.entity.Menu;
import edu.clarivate.foodapp.repository.MenuRepository;

@Repository
public class MenuDao {
	@Autowired
	private MenuRepository menuRepository;
	
	public Menu createMenu(Menu menu) {
		return menuRepository.save(menu);
	}
	
	public Menu getMenuByUserId(int id) {
		return menuRepository.getMenuByUserId(id);
	}
}
