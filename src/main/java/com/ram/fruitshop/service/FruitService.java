package com.ram.fruitshop.service;

import com.ram.fruitshop.model.Fruit;
import com.ram.fruitshop.repository.FruitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FruitService {

    private final FruitRepository repository;

    public FruitService(FruitRepository repository) {
        this.repository = repository;
    }

    public List<Fruit> getAll() {
        return repository.findAll();
    }

    public Optional<Fruit> getById(Long id) {
        return repository.findById(id);
    }

    public Fruit create(Fruit fruit) {
        return repository.save(fruit);
    }

    public Fruit update(Long id, Fruit updated) {
        return repository.findById(id).map(fruit -> {
            fruit.setName(updated.getName());
            fruit.setWeight(updated.getWeight());
            fruit.setPrice(updated.getPrice());
            return repository.save(fruit);
        }).orElseThrow(() -> new RuntimeException("Fruit not found: " + id));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
