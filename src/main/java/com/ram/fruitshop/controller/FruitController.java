package com.ram.fruitshop.controller;

import com.ram.fruitshop.model.Fruit;
import com.ram.fruitshop.service.FruitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fruits")
public class FruitController {

    private final FruitService service;

    public FruitController(FruitService service) {
        this.service = service;
    }

    @GetMapping
    public List<Fruit> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fruit> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Fruit create(@RequestBody Fruit fruit) {
        return service.create(fruit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fruit> update(@PathVariable Long id, @RequestBody Fruit fruit) {
        try {
            return ResponseEntity.ok(service.update(id, fruit));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
