package iset.pfe.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Chef;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.entities.Usine;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.ChefRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.TankRepository;
import iset.pfe.example.repositories.UsineRepository;

@SpringBootApplication
public class PfeBackEndApplication implements CommandLineRunner {

	@Autowired
	private ChefRepository chefRepository;
	@Autowired
	private TankRepository tankRepository;
	@Autowired
	private AgriculteurRepository agriculteurRepository;
	@Autowired
	private UsineRepository usineRepository;
	@Autowired
	private OperationRepository operationRepository;
	
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Date date=new Date("08/05/2021");
		
		Chef c=new Chef("Nour", "Guerfali", "nour@gmail.com", "Bizerte", 11431134, 54546450, "Nour", "1234");
		chefRepository.save(c);
		
		Tank t1=new Tank("102s50v5", 120, 0, "non remplis");
		tankRepository.save(t1);
		
		Agriculteur a1=new Agriculteur("Ahmed", "Ben saber", "ahmed@gmail.com", "Bizerte", 22332233);
		agriculteurRepository.save(a1);
		
		Usine u1=new Usine("Usine 1", "bizerte");
		usineRepository.save(u1);
		
		Operation o1=new Operation(120, date.toString(), "Remplissage", 10006);
		o1.setAgriculteur(a1);
		operationRepository.save(o1);

		
		Operation o2=new Operation(120, date.toString(), "Retrait", 10006);
		o2.setUsine(u1);
		operationRepository.save(o2);
		
		
	}

}
