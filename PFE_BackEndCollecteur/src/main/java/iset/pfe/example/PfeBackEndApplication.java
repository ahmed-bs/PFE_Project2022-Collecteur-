package iset.pfe.example;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Chef;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.Role;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.entities.Usine;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.ChefRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.RoleRepository;
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
	@Autowired
	private RoleRepository roleRepository;
	
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Date date=new Date("08/05/2021");
		
//		Chef c=new Chef("Nour", "Guerfali", "nour@gmail.com", "Bizerte", 11431134, 54546450, "Nour", "1234");
//		chefRepository.save(c);
		
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date("2021/03/25 23:36"));
	     String currentDateTime2 = dateFormatter.format(new Date());
		 
		Tank t1=new Tank("tank numero 1", 120, 0, "Vide");
		//		t1.setDateIns(currentDateTime2);
		tankRepository.save(t1);
		

		Tank t2=new Tank("tank numero 2", 120, 0, "Vide");
//		t2.setDateIns(currentDateTime);
		
		tankRepository.save(t2);
		
		
		Tank t3=new Tank("tank numero 3", 120, 0, "Vide");
//		t3.setDateIns(currentDateTime2);
		
		tankRepository.save(t3);
		
		
		Agriculteur a1=new Agriculteur("Ben saber", "Ahmed", "ahmed@gmail.com", "Bizerte", 22332233);
		a1.setMatricule("als55slql");
		agriculteurRepository.save(a1);
		
		Agriculteur a2=new Agriculteur("Slim", "Bousnina", "slim@gmail.com", "Tunis", 54658978);
		a2.setMatricule("als4zs5ql");
		agriculteurRepository.save(a2);
		
		Agriculteur a3=new Agriculteur("Wafik", "Lahbib", "wafik@gmail.com", "Alia ,Bizerte", 54658978);
		a3.setMatricule("s22sls53q");
		agriculteurRepository.save(a3);
		
		Usine u1=new Usine("SOCIETE REGIONALE DES INDUSTRIES LAITIERES (YOGO)", "Ben arous, Tunisie",72598844);
		usineRepository.save(u1);
		
		Usine u2=new Usine(" VITALAIT", "Mahdia, Tunisie",72959585);
		usineRepository.save(u2);
		
		Usine u3=new Usine(" Centrale Laitiere Du Nord ( LAINO )", "Bousalem",72565657);
		usineRepository.save(u3);

		Usine u4=new Usine(" NATILAIT", "Bizerte",72545858);
		usineRepository.save(u4);
		
//		Operation o1=new Operation(120, currentDateTime2, "Remplissage", 10006);
//		o1.setAgriculteur(a1);
//		operationRepository.save(o1);
//
//		
//		Operation o2=new Operation(120, currentDateTime2, "Retrait", 10006);
//		o2.setUsine(u1);
//		operationRepository.save(o2);
		
		
		Role role1=new Role("USER");
		roleRepository.save(role1);
		
		
		BCryptPasswordEncoder encoder; 
		encoder = new BCryptPasswordEncoder();
		
		Chef ch1=new Chef();
		ch1.setUsername("nour");
		ch1.setPassword(encoder.encode("nour"));
		ch1.setAdress("bizerte");
		ch1.setNom("Guerfali");
		ch1.setPrenom("nour");
		ch1.setEmail("nour@gmail.com");
		ch1.setCin(11431134);
		ch1.setTel(156465);
		ch1.getRoles().add(role1);
		ch1.setCentreNom("SMBSA Ettaoufik");
		chefRepository.save(ch1);
		
		
		Chef ch2=new Chef();
		ch2.setUsername("oussema");
		ch2.setPassword(encoder.encode("oussemas"));
		ch2.setAdress("bizerte");
		ch2.setNom("oussema");
		ch2.setPrenom("bejaoui");
		ch2.setEmail("oussema@gmail.com");
		ch2.setCin(11431134);
		ch2.setTel(156465);
		ch2.setCentreNom("SMBSA Ettaoufik");
		ch2.getRoles().add(role1);
		chefRepository.save(ch2);
		
		
		
	     System.out.println(currentDateTime);
	     System.out.println(currentDateTime2);
	     
	    String dateP=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
	    String dateP2=currentDateTime2.charAt(8)+""+currentDateTime2.charAt(9);
	    
	   System.out.println(Integer.parseInt(dateP2)-Integer.parseInt(dateP));
	   int size=tankRepository.findTanksNonRemplis().size();
	   for(int i=0;i<size;i++)
	   System.out.println(tankRepository.findTanksNonRemplis().get(i).getMatricule());
	     
	  
//	     System.out.println(currentDateTime.compareTo(currentDateTime2));
//	     int dateParse1=Integer.parseInt(currentDateTime2);
//	     int dateParse2=Integer.parseInt(currentDateTime);
//	     System.out.println(dateParse1-dateParse2);
	  double som=0;
		for (int i=0;i<operationRepository.findAll().size();i++) {
			Operation o6=operationRepository.findAll().get(i);
			 String date11=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
			 String date22=o6.getDateOperation().charAt(8)+""+o6.getDateOperation().charAt(9);
					 
		 if(  Integer.parseInt(date22)==Integer.parseInt(date11) && o6.getTypeOp().equals("Remplissage")) {
			som=som+o6.getPoidsLait();
		}
		}
		
		System.out.println("som ****"+som);
		
//		for(int i=0;i<operationRepository.findAll().size();i++) {
//			for(int j=0;j<tankRepository.findAll().size();j++) {
//				Tank t4=tankRepository.findAll().get(j);
//				Operation o4=operationRepository.findAll().get(i);
//				if(t4.getDateIns()==o4.getDateOperation()) {
//					System.out.println("tank :"+ t4.getIdTank());
//					System.out.println("operation "+o4.getIdOperation());
//				}
//			}
//		}
		
		double somme=0;
		double rest=0;
		for(int j=0;j<tankRepository.findAll().size();j++) {
			Tank t4=tankRepository.findAll().get(j);
			if(t4.getDateIns()!=null) {
				 String date11=currentDateTime2.charAt(8)+""+currentDateTime2.charAt(9);
				 String date22=t4.getDateIns().charAt(8)+""+t4.getDateIns().charAt(9);
				 
				 String date12=currentDateTime2.charAt(5)+""+currentDateTime2.charAt(6);
				 String date13=t4.getDateIns().charAt(5)+""+t4.getDateIns().charAt(6);
				 
				 String date14=currentDateTime2.charAt(0)+""+currentDateTime2.charAt(1)+""+currentDateTime2.charAt(2)+""+currentDateTime2.charAt(3);
				 String date15=t4.getDateIns().charAt(0)+""+t4.getDateIns().charAt(1)+""+t4.getDateIns().charAt(2)+""+t4.getDateIns().charAt(3);
				 
				 if(  Integer.parseInt(date22)==Integer.parseInt(date11) && Integer.parseInt(date12)==Integer.parseInt(date13)
						 && Integer.parseInt(date14)==Integer.parseInt(date15)) {
					 somme=somme+t4.getPoidActuel();
					 rest=rest+(t4.getPoidVide()-t4.getPoidActuel());
				 }
				
			}
			if(t4.getDateIns()==null) {
				 rest=rest+(t4.getPoidVide()-t4.getPoidActuel());
			}
		}
		System.out.println("##### somme : "+somme);
		System.out.println("##### reste : "+rest);
		
		
//			for(int j=0;j<tankRepository.findAll().size();j++) {
//				for(int i=0;i<operationRepository.findAll().size();i++){
//				Tank t5=tankRepository.findAll().get(j);
//				Operation o5=operationRepository.findAll().get(i);
//				
//				if(t5.getDateIns().equals(o5.getDateOperation()) && o5.getTypeOp().equals("Remplissage")) {
//					System.out.println(" les tanks ==> "+t5.getIdTank());
//				}
//			}
//		}
//	   
		
//		System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaa"+t1.getCodeTank().toString());
		
	}

}
