package iset.pfe.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.OperationTank;

public interface OperationRepository  extends JpaRepository<Operation,Integer>{
	 @Query("select o from OperationTank  o")
		public List<OperationTank> findAllOperationsTank();
	   
	   @Query("select o from OperationTank  o where o.idOpTank=:idOpTank")
		public OperationTank getOperationTank(@Param("idOpTank") Integer idOpTank);
	   
	   @Query("select op from Operation op where op.typeOp=:typeOp")
		public List<Operation> findAllOperationsRemplissages(@Param("typeOp") String typeOp);
	   
	   @Query("select op from OperationTank op where op.operation.idOperation=:idOperation")
		public List<OperationTank> find(@Param("idOperation") Integer idOperation);
	   
	   
		@Transactional 
		@Modifying
		@Query("delete OperationTank op where op.operation.idOperation=:idOperation")
		void deleteOpTank(@Param("idOperation") Integer idOperation);
		
		@Transactional 
		@Modifying
		@Query("delete Operation op where op.idOperation=:idOperation")
		void deleteOp(@Param("idOperation") Integer idOperation);
}
