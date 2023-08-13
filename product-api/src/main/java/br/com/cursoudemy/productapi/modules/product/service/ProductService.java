package br.com.cursoudemy.productapi.modules.product.service;

import br.com.cursoudemy.productapi.config.exception.ValidationException;
import br.com.cursoudemy.productapi.modules.category.service.CategoryService;
import br.com.cursoudemy.productapi.modules.product.dto.ProductRequest;
import br.com.cursoudemy.productapi.modules.product.dto.ProductResponse;
import br.com.cursoudemy.productapi.modules.product.model.Product;
import br.com.cursoudemy.productapi.modules.product.repository.ProductRepository;
import br.com.cursoudemy.productapi.modules.supplier.dto.SupplierResponse;
import br.com.cursoudemy.productapi.modules.supplier.model.Supplier;
import br.com.cursoudemy.productapi.modules.supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class ProductService {

    private static final Integer ZERO = 0;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private CategoryService categoryService;

    public List<ProductResponse> findAll() {
        return productRepository
            .findAll()
            .stream()
            .map(ProductResponse::of)
            .collect(Collectors.toList());
    }
    public List<ProductResponse> findByName(String name) {
        if(isEmpty(name)) {
            throw new ValidationException("The product name wasn't informed");
        }
        return productRepository
            .findByNameIgnoreCaseContaining(name)
            .stream()
            .map(ProductResponse::of)
            .collect(Collectors.toList());
    }

    public List<ProductResponse> findBySupplierId(Integer supplierId) {
        if(isEmpty(supplierId)) {
            throw new ValidationException("The Product Supplier ID wasn't informed");
        }
        return productRepository
            .findById(supplierId)
            .stream()
            .map(ProductResponse::of)
            .collect(Collectors.toList());
    }

    public List<ProductResponse> findByCategoryId(Integer productId) {
        if(isEmpty(productId)) {
            throw new ValidationException("The Product Category ID wasn't informed");
        }
        return productRepository
            .findById(productId)
            .stream()
            .map(ProductResponse::of)
            .collect(Collectors.toList());
    }

    public ProductResponse findByIdResponse(Integer id) {
        if(isEmpty(id)) {
            throw new ValidationException("The product ID wasn't informed");
        }
        return ProductResponse.of(findById(id));
    }

    public Product findById(Integer id) {
        return productRepository
            .findById(id)
            .orElseThrow(() -> new ValidationException("There's no product for the given ID."));
    }

    public ProductResponse save(ProductRequest request) {
        validateProductDataInformed(request);
        validateCategoryIdAndSupplierIdInformed(request);
        var category = categoryService.findById(request.getCategoryId());
        var supplier = supplierService.findById(request.getSupplierId());
        var product = productRepository.save(Product.of(request, supplier, category));
        return ProductResponse.of(product);
    }

    private void validateProductDataInformed(ProductRequest request) {
        if (isEmpty(request.getName())) {
            throw new ValidationException("The Product name wasn't informed.");
        }
        if (isEmpty(request.getAvailableQuantity())) {
            throw new ValidationException("The Product quantity wasn't informed.");
        }
        if (request.getAvailableQuantity() <= ZERO) {
            throw new ValidationException("The Product quantity cannot be less than or equal to zero");
        }
    }

    private void validateCategoryIdAndSupplierIdInformed(ProductRequest request) {
        if (isEmpty(request.getCategoryId())) {
            throw new ValidationException("The Category ID was not informed.");
        }
        if (isEmpty(request.getSupplierId())) {
            throw new ValidationException("The Supplier ID was not informed.");
        }
    }

}
