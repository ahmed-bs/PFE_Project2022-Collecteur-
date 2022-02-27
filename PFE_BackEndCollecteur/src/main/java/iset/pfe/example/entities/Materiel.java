package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Materiel implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idM;
	private String intitule;
	private String matricule;
	private Date dateAchat;
	
	@ManyToOne
	@JoinColumn(name="idChef")
	private Chef chef;
	
	public Materiel() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Materiel(String intitule, String matricule, Date dateAchat) {
		super();
		this.intitule = intitule;
		this.matricule = matricule;
		this.dateAchat = dateAchat;
	}
	
	
	
	public Materiel(String intitule, String matricule, Date dateAchat, Chef chef) {
		super();
		this.intitule = intitule;
		this.matricule = matricule;
		this.dateAchat = dateAchat;
		this.chef = chef;
	}
	public Integer getIdM() {
		return idM;
	}
	public void setIdM(Integer idM) {
		this.idM = idM;
	}
	public String getIntitule() {
		return intitule;
	}
	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}
	public String getMatricule() {
		return matricule;
	}
	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}
	public Date getDateAchat() {
		return dateAchat;
	}
	public void setDateAchat(Date dateAchat) {
		this.dateAchat = dateAchat;
	}
	public Chef getChef() {
		return chef;
	}
	public void setChef(Chef chef) {
		this.chef = chef;
	}

}
