package iset.pfe.example.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.TankRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TankRestController {
	@Autowired
	private TankRepository tankRepository;
	
	//getALL tanks method
	@RequestMapping(value="/tanks",method = RequestMethod.GET)
	public List<Tank> getTanks(){
		return tankRepository.findAll();
	}
	
	//get tank ById method
	@RequestMapping(value="/tanks/{idTank}",method = RequestMethod.GET)
    public Tank getTank(@PathVariable Integer idTank) {
		Optional<Tank> tank = tankRepository.findById(idTank);
		if (tank.isPresent()) { 
			return tank.get();
		}else throw new RuntimeException("Tank introuvable !!");
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
		return tankRepository.save(tank);
	}
	
	//update a tank method
	@RequestMapping(value="/tanks/{idTank}",method = RequestMethod.PUT)
	public Tank EditTank(@PathVariable Integer idTank, @RequestBody Tank tanks){
		Tank tank = tankRepository.findById(idTank).orElseThrow(()->new ResourceNotFoundException("Cet tank n'existe pas"));
		tank.setPoid(tanks.getPoid());
		tank.setVolume(tanks.getVolume());
		tank.setDate_Remplissage(tank.getDate_Remplissage());
		tank.setDate_Sortie(tank.getDate_Sortie());
		tank.setEtat(tanks.getEtat()); 	
		tankRepository.save(tank);		
	  	return tank;
    }
	
}
