package iset.pfe.example.web;

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
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.TankRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TankRestController {
	@Autowired
	private TankRepository tankRepository;
	
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
			for(int i=0;i<tankRepository.findAll().size();i++) 
			{   Tank tank2=tankRepository.findAll().get(i);
				qteGeneraleLait=qteGeneraleLait+tank2.getPoidActuel();
			}   System.out.println("######"+qteGeneraleLait);
			return qteGeneraleLait;
		}
		
		@RequestMapping(value="/qteTanksLibre",method = RequestMethod.GET)
	    public double getQteTankLibre() {
			double qte=0;
			double qteLibreLait=0;
			double qteGeneraleLait=0;
			for(int j=0;j<tankRepository.findAll().size();j++) 
			{
				Tank tank3=tankRepository.findAll().get(j);
				qte=qte+tank3.getPoidVide();
				qteGeneraleLait=qteGeneraleLait+tank3.getPoidActuel();
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
			tank.setEtat("non remplis");
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
		
	
}
