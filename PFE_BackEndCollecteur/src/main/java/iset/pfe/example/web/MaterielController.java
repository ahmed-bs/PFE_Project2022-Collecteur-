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
import iset.pfe.example.entities.Materiel;
import iset.pfe.example.repositories.MaterielRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class MaterielController {
	@Autowired
	private MaterielRepository materielRepository;
	
	@RequestMapping(value="/materiels",method = RequestMethod.GET)
	public List<Materiel> getMateriels(){
		return materielRepository.findAll();
	}
	
		
	@RequestMapping(value="/materiels/{idM}",method = RequestMethod.GET)
    public Materiel getMateriel(@PathVariable Integer idM) {
		Optional<Materiel> m = materielRepository.findById(idM);
		if (m.isPresent()) { 
			return m.get();
		}else throw new RuntimeException("Materiel introuvable !!");
	}
	
	
	@RequestMapping(value="/materiels/{idM}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteMateriel(@PathVariable Integer idM) {
		Optional<Materiel> a = materielRepository.findById(idM);
				if (a.isPresent()) { 
					materielRepository.deleteById(idM);
		    }else throw new RuntimeException("Materiel introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/materiels",method = RequestMethod.POST)
		public Materiel AddMateriel(@RequestBody Materiel materiel){
		return materielRepository.save(materiel);
	}
	
	@RequestMapping(value="/materiels/{idM}",method = RequestMethod.PUT)
	
	public Materiel EditMateriel(@PathVariable Integer idM, @RequestBody Materiel materiel){
		Materiel a = materielRepository.findById(idM).orElseThrow(()->new ResourceNotFoundException("Materiel n'existe pas"));
    	a.setDateAchat(materiel.getDateAchat());
    	a.setIntitule(materiel.getIntitule());
    	a.setMatricule(materiel.getMatricule());
    	
		materielRepository.save(a);
	  	return a;
    }
	

}
