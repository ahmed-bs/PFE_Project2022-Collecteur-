package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.Tank;

public interface TankRepository extends JpaRepository<Tank,Integer>{

}
