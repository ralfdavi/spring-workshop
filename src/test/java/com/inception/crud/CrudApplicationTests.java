package com.inception.crud;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.inception.crud.repository.CustomerRepository;

import static org.assertj.core.api.BDDAssertions.*;

@SpringBootTest(classes = CrudApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class CrudApplicationTests {

	@Autowired
	private CustomerRepository repository;

	@Test
	public void shouldFillOutComponentsWithDataWhenTheApplicationIsStarted() {
		then(this.repository.count()).isEqualTo(5);
	}

	@Test
	public void shouldFindTwoBauerCustomers() {
		then(this.repository.findByLastNameStartsWithIgnoreCase("Bauer")).hasSize(2);
	}
	
}
