package com.farmer.marketplace.product;

import com.farmer.marketplace.entity.User;
import com.farmer.marketplace.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductController(ProductRepository productRepository,
                             UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // ✅ ADD PRODUCT (NO JWT NOW)
    @PostMapping
    public Product addProduct(@RequestBody Product product,
                              @RequestParam Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        product.setFarmer(user);

        return productRepository.save(product);
    }

    // ✅ GET ALL PRODUCTS
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}