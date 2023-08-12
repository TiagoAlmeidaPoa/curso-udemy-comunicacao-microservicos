package br.com.cursoudemy.productapi.modules.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ProductRequest {

    private String name;
    @JsonProperty("available_quantity")
    private Integer availableQuantity;
    @JsonProperty("supplier_id")
    private Integer supplierId;
    @JsonProperty("category_id")
    private Integer categoryId;

}
