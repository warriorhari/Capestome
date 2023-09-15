package edu.clarivate.foodapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.clarivate.foodapp.entity.Branch;

public interface BranchRepository extends JpaRepository<Branch, Integer>{

}
