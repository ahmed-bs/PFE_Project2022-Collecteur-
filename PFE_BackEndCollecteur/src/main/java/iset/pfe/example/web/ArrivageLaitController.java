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

import iset.pfe.example.entities.ArrivageLait;
import iset.pfe.example.entities.Chef;
import iset.pfe.example.repositories.ArrivageLaitRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class ArrivageLaitController {
	@Autowired
	private ArrivageLaitRepository arrivageLaitRepository;
	
	
	@RequestMapping(value="/arrivages",method = RequestMethod.GET)
	public List<ArrivageLait> getArrivages(){
		return arrivageLaitRepository.findAll();
	}
	
		
	@RequestMapping(value="/arrivages/{idA}",method = RequestMethod.GET)
    public ArrivageLait getArrivage(@PathVariable Integer idA) {
		Optional<ArrivageLait> a = arrivageLaitRepository.findById(idA);
		if (a.isPresent()) { 
			return a.get();
		}else throw new RuntimeException("Arrivage Lait introuvable !!");
	}
	
	
	@RequestMapping(value="/arrivages/{idA}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteArrivage (@PathVariable Integer idA) {
		Optional<ArrivageLait> a = arrivageLaitRepository.findById(idA);
				if (a.isPresent()) { 
					arrivageLaitRepository.deleteById(idA);
		    }else throw new RuntimeException("Arrivage Lait introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/arrivages",method = RequestMethod.POST)
		public ArrivageLait AddArrivage(@RequestBody ArrivageLait arrivageLait){
		return arrivageLaitRepository.save(arrivageLait);
	}
	
	@RequestMapping(value="/arrivages/{idA}",method = RequestMethod.PUT)
	
	public ArrivageLait EditArrivage(@PathVariable Integer idA, @RequestBody ArrivageLait arrivageLait){
      ArrivageLait a = arrivageLaitRepository.findById(idA).orElseThrow(()->new ResourceNotFoundException("Cet arrivage n'existe pas"));
    	a.setPoids(arrivageLait.getPoids());
    	a.setVolume(arrivageLait.getVolume());
    	a.setDateArrive(arrivageLait.getDateArrive());
    	
    	arrivageLaitRepository.save(a);
	  	return a;
    }
	

}
