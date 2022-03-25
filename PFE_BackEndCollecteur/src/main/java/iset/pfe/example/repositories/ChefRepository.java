package iset.pfe.example.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Chef;

public interface ChefRepository extends JpaRepository<Chef,Integer>{
	@Query(" select u from Chef u where u.username = ?1")
	Optional<Chef> findUserWithName(String username);
}
