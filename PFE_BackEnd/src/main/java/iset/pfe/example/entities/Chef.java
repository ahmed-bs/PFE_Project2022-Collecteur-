package iset.pfe.example.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Chef implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idChef;
	private String Nom;
	private String Prenom;
	private String Email;
	private String Adress;
	private int Cin;
	private int tel;
	private String username;
	private String password;


	public Chef() {
		super();
	}
	
	public Chef(String nom, String prenom, String email, String adress, int cin, int tel,String username, String password) {
		super();
		Nom = nom;
		Prenom = prenom;
		Email = email;
		Adress = adress;
		Cin = cin;
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
		return Nom;
	}

	public void setNom(String nom) {
		Nom = nom;
	}

	public String getPrenom() {
		return Prenom;
	}

	public void setPrenom(String prenom) {
		Prenom = prenom;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getAdress() {
		return Adress;
	}

	public void setAdress(String adress) {
		Adress = adress;
	}

	public int getCin() {
		return Cin;
	}

	public void setCin(int cin) {
		Cin = cin;
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


}
