package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Operation implements Serializable{
	@Id
	@GeneratedValue
	private Integer idOperation;
	private double poidsLait;
	private String dateOperation;
	private String typeOp;
	private Integer code;
	
	
	@ManyToOne
	@JoinColumn(name="idChef")
	private Chef chef;
	
	@ManyToOne
	@JoinColumn(name="idAgriculteur")
	private Agriculteur agriculteur;
	
	@ManyToOne
	@JoinColumn(name="idUsine")
	private Usine usine;
	
	@OneToMany(mappedBy="operation",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<OperationTank> operationstank;
	
	
	
	public Operation() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Operation(double poidsLait, String dateOperation, String typeOp, Integer code) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.code = code;
	}
	
	
	public Operation(double poidsLait, String dateOperation, String typeOp, Integer code, Chef chef) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.code = code;
		this.chef = chef;
	}
	


	public Operation(double poidsLait, String dateOperation, String typeOp, Integer code, Chef chef,
			Agriculteur agriculteur, Usine usine) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.code = code;
		this.chef = chef;
		this.agriculteur = agriculteur;
		this.usine = usine;
	}


	public Integer getIdOperation() {
		return idOperation;
	}
	public void setIdOperation(Integer idOperation) {
		this.idOperation = idOperation;
	}
	public double getPoidsLait() {
		return poidsLait;
	}
	public void setPoidsLait(double poidsLait) {
		this.poidsLait = poidsLait;
	}
	public String getDateOperation() {
		return dateOperation;
	}
	public void setDateOperation(String dateOperation) {
		this.dateOperation = dateOperation;
	}
	public String getTypeOp() {
		return typeOp;
	}
	public void setTypeOp(String typeOp) {
		this.typeOp = typeOp;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}


	public Chef getChef() {
		return chef;
	}


	public void setChef(Chef chef) {
		this.chef = chef;
	}


	public Agriculteur getAgriculteur() {
		return agriculteur;
	}


	public void setAgriculteur(Agriculteur agriculteur) {
		this.agriculteur = agriculteur;
	}


	public Usine getUsine() {
		return usine;
	}


	public void setUsine(Usine usine) {
		this.usine = usine;
	}

}
