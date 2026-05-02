package com.farmer.marketplace.product;

import com.farmer.marketplace.entity.User;
import jakarta.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private int quantity;

    // ✅ Link product to farmer (User)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User farmer;

    // ✅ Getters & Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public User getFarmer() {
        return farmer;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setFarmer(User farmer) {
        this.farmer = farmer;
    }
}