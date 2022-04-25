package iset.pfe.example.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@Entity
public class OperationTank implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idOpTank;
	private String date;
	private double qteInsereTank;
	private Integer codeLiaison;
	
	@ManyToOne
	@JoinColumn(name="idTank")
	private Tank tank;
	
	@ManyToOne
	@JoinColumn(name="idOperation")
	private Operation operation;

	public OperationTank() {
		super();
		// TODO Auto-generated constructor stub
	}



	public OperationTank(String date, double qteInsereTank, Tank tank, Operation operation) {
		super();
		this.date = date;
		this.qteInsereTank = qteInsereTank;
		this.tank = tank;
		this.operation = operation;
	}
	

	public OperationTank(String date, double qteInsereTank, Integer codeLiaison, Tank tank, Operation operation) {
		super();
		this.date = date;
		this.qteInsereTank = qteInsereTank;
		this.codeLiaison = codeLiaison;
		this.tank = tank;
		this.operation = operation;
	}



	public OperationTank(String date) {
		super();
		this.date = date;
	}



	public Integer getIdOpTank() {
		return idOpTank;
	}

	public void setIdOpTank(Integer idOpTank) {
		this.idOpTank = idOpTank;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public double getQteInsereTank() {
		return qteInsereTank;
	}

	public void setQteInsereTank(double qteInsereTank) {
		this.qteInsereTank = qteInsereTank;
	}

	public Tank getTank() {
		return tank;
	}

	public void setTank(Tank tank) {
		this.tank = tank;
	}

	public Operation getOperation() {
		return operation;
	}

	public void setOperation(Operation operation) {
		this.operation = operation;
	}



	public Integer getCodeLiaison() {
		return codeLiaison;
	}



	public void setCodeLiaison(Integer codeLiaison) {
		this.codeLiaison = codeLiaison;
	}

}
