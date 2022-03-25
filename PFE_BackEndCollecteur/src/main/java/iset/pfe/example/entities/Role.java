package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Role implements Serializable {
	@Id
	@GeneratedValue
	private Integer idRole;
	private String name;
	
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "roles")
	@JsonIgnore
    private Set<Chef> users = new HashSet<>();
	
	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Role(Integer idRole, String name) {
		super();
		this.idRole = idRole;
		this.name = name;
	}

	public Role(String name) {
		super();
		this.name = name;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public Integer getIdRole() {
		return idRole;
	}

	public void setIdRole(Integer idRole) {
		this.idRole = idRole;
	}

	public Set<Chef> getUsers() {
		return users;
	}

	public void setUsers(Set<Chef> users) {
		this.users = users;
	}	
	
	
}
