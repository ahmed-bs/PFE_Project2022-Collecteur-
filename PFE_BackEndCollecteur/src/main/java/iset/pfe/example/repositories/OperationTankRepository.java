package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import iset.pfe.example.entities.OperationTank;

public interface OperationTankRepository  extends JpaRepository<OperationTank,Integer>{
	@Transactional 
	@Modifying
	@Query("delete OperationTank op where op.qteInsereTank=0")
	void deleteOpTanks();
}
