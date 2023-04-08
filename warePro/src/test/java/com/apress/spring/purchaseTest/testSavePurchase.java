package com.apress.spring.purchaseTest;

import com.warepro.spring.ArticleManagement.domain.ArticleEntity;
import com.warepro.spring.ArticleManagement.services.ArticleService;
import com.warepro.spring.purchaseManagement.domain.PurchaseEntity;
import com.warepro.spring.purchaseManagement.domain.PurchaseLineDTO;
import com.warepro.spring.purchaseManagement.domain.PurchaseLineEntity;
import com.warepro.spring.purchaseManagement.domain.PurchaseMapper;
import com.warepro.spring.purchaseManagement.repository.PurchaseRepository;
import com.warepro.spring.purchaseManagement.services.ManagePurchaseService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class testSavePurchase {

    @Mock
    private PurchaseRepository purchaseRepository;

    @Mock
    private PurchaseMapper purchaseMapper;

    @Mock
    private ArticleService articleService;

    @InjectMocks
    private ManagePurchaseService managePurchaseService;

    @Test
    public void testSavePurchase() {
        // Create input data
        List<PurchaseLineDTO> purchaseDTOList = new ArrayList<>();
        PurchaseLineDTO purchaseLineDTO1 = new PurchaseLineDTO().setArticle("1").setQuantity(10);
        PurchaseLineDTO purchaseLineDTO2 = new PurchaseLineDTO().setArticle("2").setQuantity(5);
        purchaseDTOList.add(purchaseLineDTO1);
        purchaseDTOList.add(purchaseLineDTO2);

        // Create mock objects
        PurchaseEntity purchaseEntity = new PurchaseEntity();
        PurchaseLineEntity purchaseLineEntity1 = new PurchaseLineEntity();
        ArticleEntity articleEntity1 = new ArticleEntity().setId("1").setQuantity(new BigInteger("20"));
        purchaseLineEntity1.setArticle(articleEntity1);
        purchaseLineEntity1.setQuantity(new BigDecimal(10));
        PurchaseLineEntity purchaseLineEntity2 = new PurchaseLineEntity();
        ArticleEntity articleEntity2 = new ArticleEntity().setId("2").setQuantity(new BigInteger("10"));
        purchaseLineEntity2.setArticle(articleEntity2);
        purchaseLineEntity2.setQuantity(new BigDecimal(5));
        List<PurchaseLineEntity> purchaseLineEntityList = new ArrayList<>();
        purchaseLineEntityList.add(purchaseLineEntity1);
        purchaseLineEntityList.add(purchaseLineEntity2);
        purchaseEntity.setListOfPurchases(purchaseLineEntityList);
        PurchaseLineDTO purchaseLineDTO1Result = new PurchaseLineDTO().setArticle("1").setQuantity(10);
        PurchaseLineDTO purchaseLineDTO2Result = new PurchaseLineDTO().setArticle("2").setQuantity(5);
        List<PurchaseLineDTO> purchaseDTOListResult = new ArrayList<>();
        purchaseDTOListResult.add(purchaseLineDTO1Result);
        purchaseDTOListResult.add(purchaseLineDTO2Result);

        // Configure mock objects
        when(purchaseMapper.toPurchaseEntity(purchaseDTOList)).thenReturn(purchaseEntity);
        when(purchaseMapper.toPurchaseDTO(purchaseEntity)).thenReturn(purchaseDTOListResult);

        // Call the service
        List<PurchaseLineDTO> result = managePurchaseService.savePurchase(purchaseDTOList);
        //assertEquals(purchaseDTOList,result);
    }

}
