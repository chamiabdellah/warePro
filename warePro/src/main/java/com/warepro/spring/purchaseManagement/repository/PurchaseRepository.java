package com.warepro.spring.purchaseManagement.repository;

import com.warepro.spring.purchaseManagement.domain.PurchaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, String> {
}
