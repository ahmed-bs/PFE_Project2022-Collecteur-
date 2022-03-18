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
public class Agriculteur implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idAgriculteur;
	private String nom;
	private String prenom;
	private String email;
	private String adress;
	private int tel;
	
	@OneToMany(mappedBy="agriculteur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	public Agriculteur(String nom, String prenom, String email, String adress, int tel) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.adress = adress;
		this.tel = tel;
	}
	

	public Agriculteur(String nom, String prenom, String email, String adress, int tel, Set<Operation> operations) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.adress = adress;
		this.tel = tel;
		this.operations = operations;
	}
	
	public Agriculteur() {
		super();
		// TODO Auto-generated constructor stub
	}


	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

	public int getTel() {
		return tel;
	}

	public void setTel(int tel) {
		this.tel = tel;
	}


	public Integer getIdAgriculteur() {
		return idAgriculteur;
	}


	public void setIdAgriculteur(Integer idAgriculteur) {
		this.idAgriculteur = idAgriculteur;
	}


	public Set<Operation> getOperations() {
		return operations;
	}


	public void setOperations(Set<Operation> operations) {
		this.operations = operations;
	}

	

}
