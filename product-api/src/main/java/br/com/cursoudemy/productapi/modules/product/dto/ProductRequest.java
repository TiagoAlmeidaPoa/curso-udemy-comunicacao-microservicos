package br.com.cursoudemy.productapi.modules.product.dto;

import lombok.Data;

@Data
public class ProductRequest {

    private String name;
    private Integer availableQuantity;
    private Integer supplierId;
    private Integer categoryId;

}
