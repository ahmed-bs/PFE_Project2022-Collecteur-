package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import iset.pfe.example.entities.Chef;

public interface ChefRepository extends JpaRepository<Chef,Integer>{

}
