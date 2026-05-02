package com.farmer.marketplace.repository;

import com.farmer.marketplace.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRepository extends JpaRepository<Crop, Long> {
}