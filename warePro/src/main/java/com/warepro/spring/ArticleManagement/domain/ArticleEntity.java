package com.warepro.spring.ArticleManagement.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Getter
@Setter
public class ArticleEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    @NotNull
    @NotBlank
    @Column(unique = true)
    private String code;

    @NotBlank
    @Column
    private String articleName;
    private BigInteger quantity;
    private LocalDate creationDate;
    private LocalDate modificationDate;
    private LocalDate endOfUseDate;
    private BigDecimal price;

    @PrePersist
    private void onCreate(){
      this.setCreationDate(LocalDate.now());
      this.setModificationDate(LocalDate.now());
      if(this.getQuantity()==null){
          this.setQuantity(new BigInteger("0"));
      }
    }

    @PreUpdate
    private void onUpdate(){
        this.setModificationDate(LocalDate.now());
    }

    public void delete(){
        this.setEndOfUseDate(LocalDate.now());
    }

    public void incrementQuantity(BigInteger toAddQuantity){
        BigInteger existingQuantity = this.getQuantity();
        this.setQuantity(existingQuantity.add(new BigInteger(toAddQuantity.toString())));
    }

    public boolean decrementQuantity(BigInteger toSubstractQuantity){
        BigInteger existingQuantity = this.getQuantity();
        BigInteger toSubtractQuantityBigInt = new BigInteger(toSubstractQuantity.toString());
        BigInteger result = existingQuantity.subtract(toSubtractQuantityBigInt);

        if(result.signum() >=0 ){
            // if the result value is zero or greater => subtract the quantity
            this.setQuantity(result);
            return true;
        } else {
            return false;
        }
    }
}
