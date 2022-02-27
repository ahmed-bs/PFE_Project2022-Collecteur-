package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class ArrivageLait implements Serializable{
	@Id
	@GeneratedValue
	private Integer idA;
	private double poids;
	private double volume;
	private Date dateArrive;
	
	@ManyToOne
	@JoinColumn(name="idChef")
	private Chef chef;
	
	@ManyToOne
	@JoinColumn(name="idAnalyse")
	private AnalyseLait analyseLait;
	
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
	
	public ArrivageLait(double poids, double volume, Date dateArrive, Chef chef, AnalyseLait analyseLait) {
		super();
		this.poids = poids;
		this.volume = volume;
		this.dateArrive = dateArrive;
		this.chef = chef;
		this.analyseLait = analyseLait;
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
	public Chef getChef() {
		return chef;
	}
	public void setChef(Chef chef) {
		this.chef = chef;
	}
	public AnalyseLait getAnalyseLait() {
		return analyseLait;
	}
	public void setAnalyseLait(AnalyseLait analyseLait) {
		this.analyseLait = analyseLait;
	}

}
