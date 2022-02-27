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
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class AnalyseLait implements Serializable {

	@Id
	@GeneratedValue
	private Integer idAnalyse;
	private String etatAnalyse;
	private double Temperature;
	private Date dateAnalyse;
	private double bacterie;
	private double calcium;
	private double lactose;
	private double proteine;
	
	@OneToMany(mappedBy="analyseLait",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<ArrivageLait> arrivageLait;
	
	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name="analyse_tank" , joinColumns = @JoinColumn(name="idAnalyse") , inverseJoinColumns=@JoinColumn(name="idTank"))
	@JsonIgnore
	private Set<Tank> tanks= new HashSet<>();

	
	public AnalyseLait() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AnalyseLait( String etatAnalyse, double temperature, Date dateAnalyse, double bacterie,
			double calcium, double lactose, double proteine) {
		super();
		this.etatAnalyse = etatAnalyse;
		Temperature = temperature;
		this.dateAnalyse = dateAnalyse;
		this.bacterie = bacterie;
		this.calcium = calcium;
		this.lactose = lactose;
		this.proteine = proteine;
	}
	
	
	public AnalyseLait(String etatAnalyse, double temperature, Date dateAnalyse, double bacterie, double calcium,
			double lactose, double proteine, Set<ArrivageLait> arrivageLait, Set<Tank> tanks) {
		super();
		this.etatAnalyse = etatAnalyse;
		Temperature = temperature;
		this.dateAnalyse = dateAnalyse;
		this.bacterie = bacterie;
		this.calcium = calcium;
		this.lactose = lactose;
		this.proteine = proteine;
		this.arrivageLait = arrivageLait;
		this.tanks = tanks;
	}

	public Integer getIdAnalyse() {
		return idAnalyse;
	}
	public void setIdAnalyse(Integer idAnalyse) {
		this.idAnalyse = idAnalyse;
	}
	public String getEtatAnalyse() {
		return etatAnalyse;
	}
	public void setEtatAnalyse(String etatAnalyse) {
		this.etatAnalyse = etatAnalyse;
	}
	public double getTemperature() {
		return Temperature;
	}
	public void setTemperature(double temperature) {
		Temperature = temperature;
	}
	public Date getDateAnalyse() {
		return dateAnalyse;
	}
	public void setDateAnalyse(Date dateAnalyse) {
		this.dateAnalyse = dateAnalyse;
	}
	public double getBacterie() {
		return bacterie;
	}
	public void setBacterie(double bacterie) {
		this.bacterie = bacterie;
	}
	public double getCalcium() {
		return calcium;
	}
	public void setCalcium(double calcium) {
		this.calcium = calcium;
	}
	public double getLactose() {
		return lactose;
	}
	public void setLactose(double lactose) {
		this.lactose = lactose;
	}
	public double getProteine() {
		return proteine;
	}
	public void setProteine(double proteine) {
		this.proteine = proteine;
	}
	public Set<ArrivageLait> getArrivageLait() {
		return arrivageLait;
	}
	public void setArrivageLait(Set<ArrivageLait> arrivageLait) {
		this.arrivageLait = arrivageLait;
	}
	public Set<Tank> getTanks() {
		return tanks;
	}
	public void setTanks(Set<Tank> tanks) {
		this.tanks = tanks;
	}
	
	
}
