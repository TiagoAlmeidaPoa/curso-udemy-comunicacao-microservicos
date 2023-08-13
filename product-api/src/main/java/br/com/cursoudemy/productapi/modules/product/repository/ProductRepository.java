package br.com.cursoudemy.productapi.modules.product.repository;

import br.com.cursoudemy.productapi.modules.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameIgnoreCaseContaining(String name);
    List<Product> findByCategoryId(String id);
    List<Product> findBySupplierId(String id);
}
