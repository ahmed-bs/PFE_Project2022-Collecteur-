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

import iset.pfe.example.entities.AnalyseLait;
import iset.pfe.example.entities.ArrivageLait;
import iset.pfe.example.repositories.AnalyseLaitRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class AnalyseLaitController {
	@Autowired
	private AnalyseLaitRepository analyseLaitRepository;
	
	@RequestMapping(value="/analyses",method = RequestMethod.GET)
	public List<AnalyseLait> getAnalyses(){
		return analyseLaitRepository.findAll();
	}
	
		
	@RequestMapping(value="/analyses/{idAnalyse}",method = RequestMethod.GET)
    public AnalyseLait getAnalyse(@PathVariable Integer idAnalyse) {
		Optional<AnalyseLait> a = analyseLaitRepository.findById(idAnalyse);
		if (a.isPresent()) { 
			return a.get();
		}else throw new RuntimeException("Analyse Lait introuvable !!");
	}
	
	
	@RequestMapping(value="/analyses/{idAnalyse}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteAnalyse (@PathVariable Integer idAnalyse) {
		Optional<AnalyseLait> a = analyseLaitRepository.findById(idAnalyse);
				if (a.isPresent()) { 
					analyseLaitRepository.deleteById(idAnalyse);
		    }else throw new RuntimeException("Analyse introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/analyses",method = RequestMethod.POST)
		public AnalyseLait AddAnalyse(@RequestBody AnalyseLait analyseLait){
		return analyseLaitRepository.save(analyseLait);
	}
	
	@RequestMapping(value="/analyses/{idAnalyse}",method = RequestMethod.PUT)
	
	public AnalyseLait EditAnalyse(@PathVariable Integer idAnalyse, @RequestBody AnalyseLait analyseLait){
		AnalyseLait a = analyseLaitRepository.findById(idAnalyse).orElseThrow(()->new ResourceNotFoundException("Cet analyse n'existe pas"));
    	a.setBacterie(analyseLait.getBacterie());
    	a.setCalcium(analyseLait.getCalcium());
    	a.setDateAnalyse(analyseLait.getDateAnalyse());
    	a.setEtatAnalyse(analyseLait.getEtatAnalyse());
    	a.setLactose(analyseLait.getLactose());
    	a.setProteine(analyseLait.getProteine());
    	a.setTemperature(analyseLait.getTemperature());
    	
    	analyseLaitRepository.save(a);
	  	return a;
    }
	

}

