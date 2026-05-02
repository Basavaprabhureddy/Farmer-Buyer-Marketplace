package com.farmer.marketplace.repository;

import com.farmer.marketplace.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}