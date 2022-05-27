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
import iset.pfe.example.entities.Usine;
import iset.pfe.example.repositories.UsineRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UsineRestController {
	@Autowired
	private UsineRepository usineRepository;
	
	@RequestMapping(value="/usines",method = RequestMethod.GET)
	public List<Usine> getUsines(){
		return usineRepository.findAll();
	}
	
	@RequestMapping(value="/nbreU",method = RequestMethod.GET)
	public int getNbAgreculteurs(){
		return usineRepository.findAll().size();
	}
	
	// si le nom de l'usine existe ou nn 
	@RequestMapping(value="/usine/{nomUsine}",method = RequestMethod.GET)
	public int getNomUsineUtilise(@PathVariable String nomUsine){
		int msg=0;
		for(int i=0;i<usineRepository.findAll().size();i++) {
			Usine t=usineRepository.findAll().get(i);
			if(nomUsine.equals(t.getNomUsine())) {
				msg=1;
			}
			
		}
		return msg;
	}
	// si le nom de l'usine existe ou nn 
	@RequestMapping(value="/tel/{tel}",method = RequestMethod.GET)
	public int getTelUsineUtilse(@PathVariable Integer tel){
		int msg=0;
		for(int i=0;i<usineRepository.findAll().size();i++) {
			Usine t=usineRepository.findAll().get(i);
			if(tel.equals(t.getTel())) {
				msg=1;
			}
			
		}
		return msg;
	}
	@RequestMapping(value="/usines/{idUsine}",method = RequestMethod.GET)
    public Usine getUsine(@PathVariable Integer idUsine) {
		Optional<Usine> usine = usineRepository.findById(idUsine);
		if (usine.isPresent()) { 
			return usine.get();
		}else throw new RuntimeException("Usine introuvable !!");
	}
	
	@RequestMapping(value="/usines/{idUsine}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteUsine(@PathVariable Integer idUsine) {
		Optional<Usine> u= usineRepository.findById(idUsine);
				if (u.isPresent()) { 
					usineRepository.deleteById(idUsine);
		    }else throw new RuntimeException("Usine introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	
	@RequestMapping(value="/usines",method = RequestMethod.POST)
		public Usine AddUsine(@RequestBody Usine usine){
		return usineRepository.save(usine);
	}
	
	@RequestMapping(value="/usines/{idUsine}",method = RequestMethod.PUT)
	public Usine EditUsine(@PathVariable Integer idUsine, @RequestBody Usine usines){
		Usine u= usineRepository.findById(idUsine).orElseThrow(()->new ResourceNotFoundException("Cette usine n'existe pas"));
    	
		u.setAdresse(usines.getAdresse());
		u.setNomUsine(usines.getNomUsine());
		u.setTel(usines.getTel());
		usineRepository.save(u);
			
	  	return u;
    }
	
}
