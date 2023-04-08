package com.warepro.spring.purchaseManagement.controller;


import com.warepro.spring.ArticleManagement.exceptions.validationErrors.ValidationErrorBuilder;
import com.warepro.spring.purchaseManagement.domain.PurchaseLineDTO;
import com.warepro.spring.purchaseManagement.services.ManagePurchaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final ManagePurchaseService managePurchaseService;

    @Autowired
    public PurchaseController(ManagePurchaseService service){
        this.managePurchaseService = service;
    }

    @PutMapping
    public ResponseEntity<?> archiveAPurchase(@Valid @RequestBody List<PurchaseLineDTO> purchaseDTO,
                                                                  Errors errors){
        // 1 - validate the received lines of the purchase
        if(errors.hasErrors()){
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }

        // 2 - call the service to save the purchase after validation
        List<PurchaseLineDTO> savedPurchase =  managePurchaseService.savePurchase(purchaseDTO);

        // 4 - return the saved data for potential future use
        return ResponseEntity.ok(savedPurchase);
    }

}
