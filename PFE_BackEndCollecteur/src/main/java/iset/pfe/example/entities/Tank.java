package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Tank implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idTank;
	private String matricule;
	private double poidVide;
	private double poidActuel;
	private String etat;
	
	@OneToMany(mappedBy="tank",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<OperationTank> operationstank;
	
	//constructors
	public Tank() {
		super();
	}

	public Tank(String matricule, double poidVide, double poidActuel, String etat) {
		super();
		this.matricule = matricule;
		this.poidVide = poidVide;
		this.poidActuel = poidActuel;
		this.etat = etat;
	}

	public Tank(String matricule, double poidVide, double poidActuel, String etat, Set<OperationTank> operationstank) {
		super();
		this.matricule = matricule;
		this.poidVide = poidVide;
		this.poidActuel = poidActuel;
		this.etat = etat;
		this.operationstank = operationstank;
	}

	public Integer getIdTank() {
		return idTank;
	}

	public void setIdTank(Integer idTank) {
		this.idTank = idTank;
	}

	public String getMatricule() {
		return matricule;
	}

	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}

	public double getPoidVide() {
		return poidVide;
	}

	public void setPoidVide(double poidVide) {
		this.poidVide = poidVide;
	}

	public double getPoidActuel() {
		return poidActuel;
	}

	public void setPoidActuel(double poidActuel) {
		this.poidActuel = poidActuel;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public Set<OperationTank> getOperationstank() {
		return operationstank;
	}

	public void setOperationstank(Set<OperationTank> operationstank) {
		this.operationstank = operationstank;
	}
	
	
}
