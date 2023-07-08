package com.inception.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inception.crud.entity.Customer;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	List<Customer> findByLastNameStartsWithIgnoreCase(String lastName);
}
