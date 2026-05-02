package com.farmer.marketplace.controller;

import com.farmer.marketplace.entity.User;
import com.farmer.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all users (WITHOUT password)
    @GetMapping
    public List<User> getAllUsers() {

        List<User> users = userRepository.findAll();

        // 🔥 Hide passwords before sending
        users.forEach(user -> user.setPassword(null));

        return users;
    }
}