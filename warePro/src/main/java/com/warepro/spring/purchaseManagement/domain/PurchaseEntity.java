package com.warepro.spring.purchaseManagement.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Data
@Entity
@NoArgsConstructor
public class PurchaseEntity {

    // a purchase will contain the following informations :
    /*
        - the [client].
        - the list of bought articles
            - for each line of the purchase :=> new Entity : "PurchaseLine".
                * the Article.
                * the id of the line.
                * the requested quantity.
                * the total amount of the line.
        - the date of the purchase.
        - the creation date.
        - the user who sold the items.
        - the total amount.
        - [Taxes will be added in the future].
    * */

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @OneToMany(mappedBy = "id", cascade= CascadeType.ALL, orphanRemoval=true)
    private List<PurchaseLineEntity> listOfPurchases;

    private LocalDate creationDate;

    private BigDecimal totalAmount;

    @PrePersist
    private void onCreate(){
        this.setCreationDate(LocalDate.now());
        this.setTotalAmount(calculateTotalAmount());
    }

    public BigDecimal calculateTotalAmount(){

        Optional<PurchaseLineEntity> purchaseTotal = listOfPurchases.stream().reduce((subTotal, line ) -> {
            BigDecimal linePrice = line.getArticle().getPrice();
            BigDecimal lineTotal = line.getQuantity().multiply(linePrice);
            BigDecimal newTotal = subTotal.getTotalAmount().add(lineTotal);
            subTotal.setTotalAmount(newTotal);
            return subTotal;
        });

        return purchaseTotal.isPresent() ? purchaseTotal.get().getTotalAmount() : new BigDecimal("0");
    }
}
