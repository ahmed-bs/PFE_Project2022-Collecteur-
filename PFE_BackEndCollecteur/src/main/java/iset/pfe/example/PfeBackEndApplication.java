package iset.pfe.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import iset.pfe.example.entities.AnalyseLait;
import iset.pfe.example.entities.ArrivageLait;
import iset.pfe.example.entities.Chef;
import iset.pfe.example.entities.Materiel;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.AnalyseLaitRepository;
import iset.pfe.example.repositories.ArrivageLaitRepository;
import iset.pfe.example.repositories.ChefRepository;
import iset.pfe.example.repositories.MaterielRepository;
import iset.pfe.example.repositories.TankRepository;

@SpringBootApplication
public class PfeBackEndApplication implements CommandLineRunner {

	@Autowired
	private ChefRepository chefRepository;
	@Autowired
	private AnalyseLaitRepository analyseLaitRepository;
	@Autowired
	private ArrivageLaitRepository arrivageLaitRepository ;
	@Autowired
	private MaterielRepository materielRepository;
	@Autowired
	private TankRepository tankRepository;
	
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Date date=new Date("08/05/2021");
		
		Chef c=new Chef("Nour", "Guerfali", "nour@gmail.com", "Bizerte", 11431134, 54546450, "Nour", "1234");
		chefRepository.save(c);
		
		AnalyseLait a1=new AnalyseLait("bonne", 35.5, date, 1.2, 1.5, 2.1, 2.5);
		analyseLaitRepository.save(a1);
		
		ArrivageLait arr1=new ArrivageLait(125, 125, date, c, a1);
		arrivageLaitRepository.save(arr1);
		
		Materiel m1=new Materiel("materiel 1 ....", "12346vf21", date,c);
		materielRepository.save(m1);
		
		
		Tank t1=new Tank(125, 125, date, date, 1);
		//t1.getAnalyseLaits().add(a1);
		tankRepository.save(t1);
		
		//a1.getTanks().add(t1);
		//analyseLaitRepository.save(a1);
		//tankRepository.save(t1);
		
		
	}

}
