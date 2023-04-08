package com.warepro.spring.purchaseManagement.services;

import com.warepro.spring.ArticleManagement.services.ArticleService;
import com.warepro.spring.purchaseManagement.domain.PurchaseEntity;
import com.warepro.spring.purchaseManagement.domain.PurchaseLineDTO;
import com.warepro.spring.purchaseManagement.domain.PurchaseMapper;
import com.warepro.spring.purchaseManagement.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagePurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final PurchaseMapper purchaseMapper;
    private final ArticleService articleService;

    @Autowired
    public ManagePurchaseService(PurchaseRepository repository, PurchaseMapper purchaseMapper,
                                 ArticleService articleService){
        this.purchaseRepository = repository;
        this.purchaseMapper = purchaseMapper;
        this.articleService = articleService;
    }

    public List<PurchaseLineDTO> savePurchase(List<PurchaseLineDTO> purchaseDTO) {

        // create the history object
        PurchaseEntity purchase = this.purchaseMapper.toPurchaseEntity(purchaseDTO);

        // save the purchase using the repo
        this.purchaseRepository.save(purchase);

        // change the quantity for each article
        purchase.getListOfPurchases().forEach((purchaseLine ->
            articleService.incrementQuantityOfArticle(purchaseLine.getArticle().getId(),purchaseLine.getQuantity())
        ));

        // convert the purchase to List of DTO
        return this.purchaseMapper.toPurchaseDTO(purchase);

    }

}
