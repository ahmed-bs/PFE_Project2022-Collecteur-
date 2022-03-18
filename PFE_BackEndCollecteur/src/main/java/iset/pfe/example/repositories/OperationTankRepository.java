package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.OperationTank;

public interface OperationTankRepository  extends JpaRepository<OperationTank,Integer>{

}
