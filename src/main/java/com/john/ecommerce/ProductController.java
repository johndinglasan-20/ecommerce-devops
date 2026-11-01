package com.john.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Dipendenze per la gestione del database (Endpoint vulenrabile)
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Map;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired 
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

       @GetMapping("/search-vulnerable")
    public List<Map<String, Object>> searchVulnerable(@RequestParam String name) {
        // Correggi qui: 'product' (singolare) e '=' (singolo uguale)
        String sql = "SELECT * FROM product WHERE name = '" + name + "'"; 
        System.out.println("SQL ESEGUITO: " + sql); 
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/search-safe")
    public List<Map<String, Object>> searchSafe(@RequestParam String name) {
        // Correggi anche qui: 'product' (singolare)
        String sql = "SELECT * FROM product WHERE name = ?"; 
        return jdbcTemplate.queryForList(sql, name);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    
}
