package com.farmer.marketplace.controller;

import com.farmer.marketplace.entity.User;
import com.farmer.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User loginUser) {

        User user = userRepository.findByEmailAndPassword(
                loginUser.getEmail(),
                loginUser.getPassword()
        );

        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }

        // ✅ RETURN ROLE ALSO
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return response;
    }
}