package iset.pfe.example.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.TankRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TankRestController {
	@Autowired
	private TankRepository tankRepository;
	
	@Autowired
	private OperationRepository operationRepository;
	
		@RequestMapping(value="/tanks",method = RequestMethod.GET)
		public List<Tank> getTanks(){
			return tankRepository.findAll();
		}
		
		@RequestMapping(value="/nbreT",method = RequestMethod.GET)
		public int getNbTanks(){
			return tankRepository.findAll().size();
		}
		
		
		@RequestMapping(value="/tanksFilres",method = RequestMethod.GET)
		public List<Tank> getAllTanks(){
			return tankRepository.findAllTanks();
		}
		
		@RequestMapping(value="/QteG",method = RequestMethod.GET)
		public double getQteGenerale(){
			double qte=0;
			for(int i=0;i<tankRepository.findAll().size();i++) 
			{  
				Tank tank2=tankRepository.findAll().get(i);
				qte=qte+tank2.getPoidActuel(); 
			}
			return qte;
			
		}
		
		
		@RequestMapping(value="/QteTanks",method = RequestMethod.GET)
		public double getQteTanks(){
			double qte=0;
			for(int i=0;i<tankRepository.findAll().size();i++) 
			{  
				Tank tank2=tankRepository.findAll().get(i);
				qte=qte+tank2.getPoidVide(); 
			}
			return qte;
			
		}
		
		
		//get tank ById method
		@RequestMapping(value="/tanks/{idTank}",method = RequestMethod.GET)
	    public Tank getTank(@PathVariable Integer idTank) {
			Optional<Tank> tank = tankRepository.findById(idTank);
			if (tank.isPresent()) { 
				return tank.get();
			}else throw new RuntimeException("Tank introuvable !!");
		}
		
		@RequestMapping(value="/qteTanksGenerale",method = RequestMethod.GET)
	    public double getQteTankGenerale() {
			double qteGeneraleLait=0;
			
			 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		     String currentDateTime = dateFormatter.format(new Date());
			for(int i=0;i<tankRepository.findAll().size();i++) 
			{  
				Tank tank3=tankRepository.findAll().get(i);
				if(tank3.getDateIns()!=null) {
					 String dateP=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
					 String dateP2=tank3.getDateIns().charAt(8)+""+tank3.getDateIns().charAt(9);
				if(Integer.parseInt(dateP2)==Integer.parseInt(dateP) ) {
				Tank tank2=tankRepository.findAll().get(i);
				qteGeneraleLait=qteGeneraleLait+tank2.getPoidActuel();
			} 
			}
			}System.out.println("######"+qteGeneraleLait);
			return qteGeneraleLait;
		}
		
		@RequestMapping(value="/qteTanksLibre",method = RequestMethod.GET)
	    public double getQteTankLibre() {
			double qte=0;
			double qteLibreLait=0;
			double qteGeneraleLait=0;
			
			 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		     String currentDateTime = dateFormatter.format(new Date());
		     
			for(int j=0;j<tankRepository.findAll().size();j++) 
			{
				
				Tank tank3=tankRepository.findAll().get(j);
				if(tank3.getDateIns()!=null) {
					 String dateP=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
					 String dateP2=tank3.getDateIns().charAt(8)+""+tank3.getDateIns().charAt(9);
				if(Integer.parseInt(dateP2)==Integer.parseInt(dateP) ) {
				qte=qte+tank3.getPoidVide();
				qteGeneraleLait=qteGeneraleLait+tank3.getPoidActuel();
			}
			}
				
				if(tank3.getDateIns()==null) {
					
				qte=qte+tank3.getPoidVide();
				qteGeneraleLait=qteGeneraleLait+tank3.getPoidActuel();	
			}
			}
			qteLibreLait=qte-qteGeneraleLait;
			System.out.println("######"+qteLibreLait);
			return qteLibreLait;
		}
		
		
		
		//delete tank method
		@RequestMapping(value="/tanks/{idTank}",method = RequestMethod.DELETE)
		@ResponseBody
		public void deleteTank(@PathVariable Integer idTank) {
			Optional<Tank> tank = tankRepository.findById(idTank);
					if (tank.isPresent()) { 
						tankRepository.deleteById(idTank);
			    }else throw new RuntimeException("Tank introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
		
		//create new tank method 
		@RequestMapping(value="/tanks",method = RequestMethod.POST)
			public Tank AddTank(@RequestBody Tank tank ){
			tank.setEtat("Non remplis");
			tank.setPoidActuel(0);
			
				
			return tankRepository.save(tank);
		}
		
		//update a tank method
		@RequestMapping(value="/tanks/{idTank}",method = RequestMethod.PUT)
		public Tank EditTank(@PathVariable Integer idTank, @RequestBody Tank tanks){
		Tank t= tankRepository.findById(idTank).orElseThrow(()->new ResourceNotFoundException("Cet tank n'existe pas"));
			t.setMatricule(tanks.getMatricule());
//			t.setPoidActuel(tanks.getPoidActuel());
			t.setPoidVide(tanks.getPoidVide());

			tankRepository.save(t);
				
		  	return t;
	    }
		
		
		@RequestMapping(value="/tanksdispo",method = RequestMethod.GET)
		public void get(){
		for(int j=0;j<tankRepository.findAll().size();j++) {
			for(int i=0;i<operationRepository.findAll().size();i++){
			Tank t5=tankRepository.findAll().get(j);
			Operation o5=operationRepository.findAll().get(i);
			if(t5.getDateIns()!=null) {
			if(t5.getDateIns().equals(o5.getDateOperation()) && o5.getTypeOp().equals("Remplissage")) {
				System.out.println(" les tanks ==> "+t5.getIdTank());
				//t5.getIdTank();
			}
		 }
		}
	}
}
		
		
		@RequestMapping(value="/tanksQte",method = RequestMethod.GET)
		public double getTank(){
			
			 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		     String currentDateTime = dateFormatter.format(new Date("2021/03/25 23:36"));
		     String currentDateTime2 = dateFormatter.format(new Date());
		     
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
			return rest;
				}
	
		
	
}
