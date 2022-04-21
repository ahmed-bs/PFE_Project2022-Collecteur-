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
import iset.pfe.example.entities.Chef;
import iset.pfe.example.entities.User;
import iset.pfe.example.repositories.ChefRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class ChefRestController {
	@Autowired
	private ChefRepository chefRepository;
	
	@RequestMapping(value="/chefs",method = RequestMethod.GET)
	public List<Chef> getChefs(){
		return chefRepository.findAll();
	}
	
	@RequestMapping(value="/getUser/{username}",method = RequestMethod.GET)
    public Chef getuser(@PathVariable String username) {
	Chef u=chefRepository.findUserWithName(username).get();
		return u;
	}
	
		
	@RequestMapping(value="/chefs/{idChef}",method = RequestMethod.GET)
    public Chef getChef(@PathVariable Integer idChef) {
		Optional<Chef> ag = chefRepository.findById(idChef);
		if (ag.isPresent()) { 
			return ag.get();
		}else throw new RuntimeException("Chef introuvable !!");
	}
	
	
	@RequestMapping(value="/chefs/{idChef}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteChef(@PathVariable Integer idChef) {
		Optional<Chef> chef = chefRepository.findById(idChef);
				if (chef.isPresent()) { 
				chefRepository.deleteById(idChef);
		    }else throw new RuntimeException("Chef introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/chefs",method = RequestMethod.POST)
		public Chef AddChef(@RequestBody Chef chef ){
		return chefRepository.save(chef);
	}
	
	@RequestMapping(value="/chefs/{idChef}",method = RequestMethod.PUT)
	
	public Chef EditChef(@PathVariable Integer idChef, @RequestBody Chef chef){
      Chef ag = chefRepository.findById(idChef).orElseThrow(()->new ResourceNotFoundException("Ce Chef n'existe pas"));
    	
    	ag.setAdress(chef.getAdress());
    	ag.setCin(ag.getCin());
    	ag.setEmail(chef.getEmail());
    	ag.setNom(ag.getNom());
    	ag.setPrenom(chef.getPrenom());
    	ag.setUsername(chef.getUsername());
    	ag.setTel(chef.getTel());
    	ag.setPassword(chef.getPassword());
		chefRepository.save(ag);
			
	  	return ag;
    }
	

}
