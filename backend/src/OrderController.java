package com.farmer.marketplace.controller;

import com.farmer.marketplace.entity.Order;
import com.farmer.marketplace.entity.Crop;
import com.farmer.marketplace.repository.OrderRepository;
import com.farmer.marketplace.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CropRepository cropRepository;

    // ✅ PLACE ORDER (Buyer)
    @PostMapping("/request")
    public Order placeOrder(
            @RequestParam Long buyerId,
            @RequestParam Long cropId,
            @RequestParam double price) {

        Order order = new Order();
        order.setBuyerId(buyerId);
        order.setCropId(cropId);
        order.setOfferedPrice(price);
        order.setCounterPrice(null);
        order.setStatus("REQUESTED");

        return orderRepository.save(order);
    }

    // ✅ BUYER → HIS ORDERS
    @GetMapping("/buyer/{buyerId}")
    public List<Order> getBuyerOrders(@PathVariable Long buyerId) {
        return orderRepository.findAll()
                .stream()
                .filter(o -> o.getBuyerId().equals(buyerId))
                .collect(Collectors.toList());
    }

    // ✅ FARMER → ONLY HIS CROP ORDERS
    @GetMapping("/farmer/{farmerId}")
    public List<Order> getFarmerOrders(@PathVariable Long farmerId) {

        return orderRepository.findAll()
                .stream()
                .filter(o -> {
                    Crop crop = cropRepository.findById(o.getCropId()).orElse(null);
                    return crop != null && crop.getFarmerId().equals(farmerId);
                })
                .collect(Collectors.toList());
    }

    // ✅ COUNTER (Farmer)
    @PutMapping("/counter/{id}")
    public Order counter(@PathVariable Long id, @RequestParam Double price) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setCounterPrice(price);
        order.setStatus("COUNTERED");

        return orderRepository.save(order);
    }

    // ✅ ACCEPT
    @PutMapping("/accept/{id}")
    public Order accept(@PathVariable Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("ACCEPTED");
        return orderRepository.save(order);
    }

    // ✅ REJECT
    @PutMapping("/reject/{id}")
    public Order reject(@PathVariable Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("REJECTED");
        return orderRepository.save(order);
    }
}