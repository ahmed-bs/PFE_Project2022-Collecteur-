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

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Chef;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.ChefRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class AgriculteurRestController {
	@Autowired
	private AgriculteurRepository agriculteurRepository;
	
	@RequestMapping(value="/agriculteurs",method = RequestMethod.GET)
	public List<Agriculteur> getagriculteurs(){
		return agriculteurRepository.findAll();
	}
	
	//si le nom et prenom de l'agriculteur existe ou nn
	@RequestMapping(value="/agriculteur/{nom}/{prenom}",method = RequestMethod.GET)
	public int getNomPrenom(@PathVariable String nom , @PathVariable String prenom ){
		int msg=0;
		for(int i=0;i<agriculteurRepository.findAll().size();i++) {
			Agriculteur t=agriculteurRepository.findAll().get(i);
			if(nom.equals(t.getNom()) && prenom.equals(t.getPrenom()))
				msg=1;
		}
		return msg;
	}
	
	//si le telephone de l'agriculteur existe ou nn
	@RequestMapping(value="/agriculteur/{tel}",method = RequestMethod.GET)
	public int getTel(@PathVariable int tel ){
		int msg=0;
		for(int i=0;i<agriculteurRepository.findAll().size();i++) {
			Agriculteur t=agriculteurRepository.findAll().get(i);
			if(tel == t.getTel())
				msg=1;
		}
		return msg;
	}
	
	//si lematricule de l'agriculteur existe ou nn
		@RequestMapping(value="/ag/{matricule}",method = RequestMethod.GET)
		public int getmatricule(@PathVariable String matricule ){
			int msg=0;
			for(int i=0;i<agriculteurRepository.findAll().size();i++) {
				Agriculteur t=agriculteurRepository.findAll().get(i);
				if(t.getMatricule().equals(matricule))
					msg=1;
			}
			return msg;
		}
	
	
	@RequestMapping(value="/nbreA",method = RequestMethod.GET)
	public int getNbAgreculteurs(){
		return agriculteurRepository.findAll().size();
	}
		
	@RequestMapping(value="/agriculteurs/{idAgriculteur}",method = RequestMethod.GET)
    public Agriculteur getAgriculteur(@PathVariable Integer idAgriculteur) {
		Optional<Agriculteur> a = agriculteurRepository.findById(idAgriculteur);
		if (a.isPresent()) { 
			return a.get();
		}else throw new RuntimeException("Agriculteur introuvable !!");
	}
	
	
	@RequestMapping(value="/agriculteurs/{idAgriculteur}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteAgriculteur(@PathVariable Integer idAgriculteur) {
		Optional<Agriculteur> ag = agriculteurRepository.findById(idAgriculteur);
				if (ag.isPresent()) { 
				agriculteurRepository.deleteById(idAgriculteur);
		    }else throw new RuntimeException("Agriculteur introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/agriculteurs",method = RequestMethod.POST)
		public Agriculteur AddAgriculteur(@RequestBody Agriculteur agriculteur){
		return agriculteurRepository.save(agriculteur);
	}
	
	@RequestMapping(value="/agriculteurs/{idAgriculteur}",method = RequestMethod.PUT)
	
	public Agriculteur EditAgriculteur(@PathVariable Integer idAgriculteur, @RequestBody Agriculteur agriculteur){
		Agriculteur ag = agriculteurRepository.findById(idAgriculteur).orElseThrow(()->new ResourceNotFoundException("Cet agriculteur n'existe pas"));
    	
		  ag.setAdress(agriculteur.getAdress());
		  ag.setEmail(agriculteur.getEmail());
		  ag.setNom(agriculteur.getNom());
		  ag.setPrenom(agriculteur.getPrenom());
		  ag.setTel(agriculteur.getTel());
		  ag.setMatricule(agriculteur.getMatricule());
		  agriculteurRepository.save(ag);
			
	  	return ag;
    }
}
