package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Usine implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idUsine;
	private String nomUsine;
	private String adresse;
	private Integer tel;
	
	
	public Integer getTel() {
		return tel;
	}

	public void setTel(Integer tel) {
		this.tel = tel;
	}

	public Set<Operation> getOperations() {
		return operations;
	}

	public void setOperations(Set<Operation> operations) {
		this.operations = operations;
	}
	@OneToMany(mappedBy="usine",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	public Usine() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Usine(String nomUsine, String adresse, Set<Operation> operations) {
		super();
		this.nomUsine = nomUsine;
		this.adresse = adresse;
		this.operations = operations;
	}



	public Usine(String nomUsine, String adresse) {
		super();
		this.nomUsine = nomUsine;
		this.adresse = adresse;
	}
	public Integer getIdUsine() {
		return idUsine;
	}
	public void setIdUsine(Integer idUsine) {
		this.idUsine = idUsine;
	}
	public String getNomUsine() {
		return nomUsine;
	}
	public void setNomUsine(String nomUsine) {
		this.nomUsine = nomUsine;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public Usine( String nomUsine, String adresse, Integer tel) {
		super();
		this.nomUsine = nomUsine;
		this.adresse = adresse;
		this.tel = tel;
	}
	
}
