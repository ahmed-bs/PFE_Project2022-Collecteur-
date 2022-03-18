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
public class Chef implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idChef;
	private String nom;
	private String prenom;
	private String email;
	private String adress;
	private int cin;
	private int tel;
	private String username;
	private String password;
	
	@OneToMany(mappedBy="chef",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	



	public Chef(String nom, String prenom, String email, String adress, int cin, int tel, String username,
			String password, Set<Operation> operations) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.adress = adress;
		this.cin = cin;
		this.tel = tel;
		this.username = username;
		this.password = password;
		this.operations = operations;
	}

	public Chef() {
		super();
	}

public Chef(String nom, String prenom, String email, String adress, int cin, int tel, String username,
		String password) {
	super();
	this.nom = nom;
	this.prenom = prenom;
	this.email = email;
	this.adress = adress;
	this.cin = cin;
	this.tel = tel;
	this.username = username;
	this.password = password;
}

public Integer getIdChef() {
	return idChef;
}

public void setIdChef(Integer idChef) {
	this.idChef = idChef;
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

public int getCin() {
	return cin;
}

public void setCin(int cin) {
	this.cin = cin;
}

public int getTel() {
	return tel;
}

public void setTel(int tel) {
	this.tel = tel;
}

public String getUsername() {
	return username;
}

public void setUsername(String username) {
	this.username = username;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public Set<Operation> getOperations() {
	return operations;
}

public void setOperations(Set<Operation> operations) {
	this.operations = operations;
}

@Override
public String toString() {
	return "Chef [idChef=" + idChef + ", nom=" + nom + ", prenom=" + prenom + ", email=" + email + ", adress=" + adress
			+ ", cin=" + cin + ", tel=" + tel + ", username=" + username + ", password=" + password + ", operations="
			+ operations + "]";
}
	
}
