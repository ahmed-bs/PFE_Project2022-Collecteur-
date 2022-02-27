package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ArrivageLait implements Serializable{
	@Id
	@GeneratedValue
	private Integer idA;
	private double poids;
	private double volume;
	private Date dateArrive;
	public ArrivageLait() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ArrivageLait(Integer idA, double poids, double volume, Date dateArrive) {
		super();
		this.idA = idA;
		this.poids = poids;
		this.volume = volume;
		this.dateArrive = dateArrive;
	}
	public Integer getIdA() {
		return idA;
	}
	public void setIdA(Integer idA) {
		this.idA = idA;
	}
	public double getPoids() {
		return poids;
	}
	public void setPoids(double poids) {
		this.poids = poids;
	}
	public double getVolume() {
		return volume;
	}
	public void setVolume(double volume) {
		this.volume = volume;
	}
	public Date getDateArrive() {
		return dateArrive;
	}
	public void setDateArrive(Date dateArrive) {
		this.dateArrive = dateArrive;
	}

}
