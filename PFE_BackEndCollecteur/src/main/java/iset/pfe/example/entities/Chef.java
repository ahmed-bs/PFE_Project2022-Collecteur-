package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Chef  implements Serializable , UserDetails{
	
	@Id
	@GeneratedValue
	private Integer idChef;
	private String nom;
	private String prenom;
	private String email;
	private String adress;
	private int cin; //badalha matricule
	private int tel;
	private String username;
	private String password;
	private String centreNom;
	@OneToMany(mappedBy="chef",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name="agriculteur_roles" , joinColumns = @JoinColumn(name="idAgriculteur") , inverseJoinColumns=@JoinColumn(name="idRole"))
	@JsonIgnore
	private Set<Role> roles = new HashSet<>();

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

	public Chef(Integer idChef, String nom, String prenom, String email, String adress, int cin, int tel,
			String username, String password, String centreNom, Set<Role> roles) {
		super();
		this.idChef = idChef;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.adress = adress;
		this.cin = cin;
		this.tel = tel;
		this.username = username;
		this.password = password;
		this.centreNom = centreNom;
		this.roles = roles;
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

public String getCentreNom() {
	return centreNom;
}

public void setCentreNom(String centreNom) {
	this.centreNom = centreNom;
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

@Override
public boolean isAccountNonExpired() {
return false;
}

@Override
public boolean isAccountNonLocked() {
return false;
}

@Override
public boolean isCredentialsNonExpired() {
return false;
}

@Override
public boolean isEnabled() {
return false;
}

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
	Set<Role> roles = this.getRoles();           
	List<SimpleGrantedAuthority> authorities = new ArrayList<>();
	            
	            for (Role role : roles) {
	                authorities.add(new SimpleGrantedAuthority(role.getName()));
	            }
	            
	            return authorities;
}

public Set<Role> getRoles() {
	return roles;
}

public void setRoles(Set<Role> roles) {
	this.roles = roles;
}
	
}
