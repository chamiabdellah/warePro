package com.warepro.spring.purchaseManagement.domain;

import com.warepro.spring.ArticleManagement.domain.ArticleEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;

@Data
@Entity(name="purchaseLine")
@NoArgsConstructor
public class PurchaseLineEntity {

    /*
        - the list of bought articles
            - for each line of the purchase :=> new Entity : "PurchaseLine".
                * the Article.
                * the id of the line.
                * the requested quantity.
                * the total amount of the line.
    * */

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @ManyToOne
    @JoinColumn(name = "ARTICLE_LINE")
    private ArticleEntity article;

    private BigDecimal quantity;

    private BigDecimal totalAmount;

    @PrePersist
    private void onCreate(){
        this.setTotalAmount(quantity.multiply(article.getPrice()));
    }

}
