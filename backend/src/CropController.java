package com.farmer.marketplace.controller;

import com.farmer.marketplace.entity.Crop;
import com.farmer.marketplace.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "http://localhost:3000")
public class CropController {

    @Autowired
    private CropRepository cropRepository;

    @PostMapping
    public Crop addCrop(
            @RequestParam String name,
            @RequestParam double price,
            @RequestParam int quantity,
            @RequestParam Long userId,
            @RequestParam(required = false) MultipartFile image
    ) {
        Crop crop = new Crop();
        crop.setName(name);
        crop.setPrice(price);
        crop.setQuantity(quantity);
        crop.setFarmerId(userId); // ✅ FIX

        if (image != null && !image.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path path = Paths.get("uploads/" + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, image.getBytes());

                crop.setImageUrl(fileName);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return cropRepository.save(crop);
    }

    @GetMapping
    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }
}