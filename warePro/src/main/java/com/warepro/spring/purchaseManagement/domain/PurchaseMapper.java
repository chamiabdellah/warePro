package com.warepro.spring.purchaseManagement.domain;

import com.warepro.spring.ArticleManagement.domain.ArticleEntity;
import com.warepro.spring.ArticleManagement.exceptions.articleExceptions.ArticleNotFoundException;
import com.warepro.spring.ArticleManagement.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PurchaseMapper {

    private final ArticleRepository articleRepository;

    @Autowired
    public PurchaseMapper(ArticleRepository repo){this.articleRepository = repo;}

    private PurchaseLineDTO toPurchaseLineDTO(PurchaseLineEntity purchaseLine){
        return new PurchaseLineDTO()
                .setArticle(purchaseLine.getArticle().getId())
                .setQuantity(purchaseLine.getQuantity().intValue());
    }

    private PurchaseLineEntity toPurchaseLineEntity(PurchaseLineDTO purchaseLineDTO){

        ArticleEntity article = this.articleRepository.findById(purchaseLineDTO.getArticle()).orElseThrow(
                ()-> new ArticleNotFoundException(purchaseLineDTO.getArticle()));

        PurchaseLineEntity purchaseLine =  new PurchaseLineEntity();
        purchaseLine.setArticle(article);
        purchaseLine.setQuantity(new BigDecimal(purchaseLineDTO.getQuantity()));

        return purchaseLine;
    }

    public PurchaseEntity toPurchaseEntity(List<PurchaseLineDTO> listPurchaseLineDTO){

        PurchaseEntity purchase = new PurchaseEntity();

        purchase.setListOfPurchases(listPurchaseLineDTO.stream().map(this::toPurchaseLineEntity).toList());

        purchase.calculateTotalAmount();

        return purchase;
    }

    public List<PurchaseLineDTO> toPurchaseDTO(PurchaseEntity purchase){
        if (purchase != null){
            return purchase.getListOfPurchases().stream().map(this::toPurchaseLineDTO).toList();
        }
        return null;
    }
}
