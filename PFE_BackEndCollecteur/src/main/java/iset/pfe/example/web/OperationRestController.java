package iset.pfe.example.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.OperationTank;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.ChefRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.OperationTankRepository;
import iset.pfe.example.repositories.TankRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class OperationRestController {
	
	@Autowired
	private OperationRepository operationRepository;
	@Autowired
	private TankRepository tankRepository;
	@Autowired
	private OperationTankRepository operationTankRepository;
	@Autowired
	private AgriculteurRepository agriculteurRepository;
	@Autowired
	private ChefRepository chefRepository;
	
	@RequestMapping(value="/operations",method = RequestMethod.GET)
	public List<Operation> getOperations(){
		return operationRepository.findAll();
	}
	
		
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.GET)
	public Operation getOperation(@PathVariable Integer idOperation) {
	Optional<Operation> op = operationRepository.findById(idOperation);
		if (op.isPresent()) { 
			return op.get();
		}else throw new RuntimeException("Operation introuvable !!");
	}
	
	@RequestMapping(value="/find/{idOperation}",method = RequestMethod.GET)
	public List<OperationTank> fingOperation(@PathVariable Integer idOperation) {
	List<OperationTank> op = operationRepository.find(idOperation);
		return op;
	}
	
	
	
	@RequestMapping(value="/operationsTank/{idOpTank}",method = RequestMethod.GET)
	public OperationTank getOperationTank(@PathVariable Integer idOpTank) {
	OperationTank opT = operationRepository.getOperationTank(idOpTank);
		return opT;
	}
	
	
	

		
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteOperation(@PathVariable Integer idOperation) {
		Optional<Operation> op= operationRepository.findById(idOperation);
			 if (op.isPresent()) { 
				operationRepository.deleteOp(idOperation);
			}else throw new RuntimeException("Operation introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
	
	
	@RequestMapping(value="/operations",method = RequestMethod.POST)
	public Operation AddOperation(@RequestBody Operation operation){
		
	return operationRepository.save(operation);
}
	


	
	@RequestMapping(value="/remplissage",method = RequestMethod.POST)
		public Operation AddOperationRemplissage(@RequestBody Operation operation){
		
		
		//la quantite generale de lait inserée dans les tanks :
		double qteGeneraleLait=0;
		double diff=0;
		for(int i=0;i<tankRepository.findAll().size();i++) 
		{   Tank tank2=tankRepository.findAll().get(i);
			qteGeneraleLait=qteGeneraleLait+tank2.getPoidActuel();
		}   System.out.println("######"+qteGeneraleLait);



		//la quantite libre de lait :
		double qte=0;
		double qteLibreLait=0;
		for(int j=0;j<tankRepository.findAll().size();j++) 
		{
			Tank tank3=tankRepository.findAll().get(j);
			qte=qte+tank3.getPoidVide();
		}
		qteLibreLait=qte-qteGeneraleLait;
		System.out.println("######"+qteLibreLait);
		
		double s=0;
		double a=operation.getPoidsLait();
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
	     System.out.println(currentDateTime);
	     
		
		if(a>qteLibreLait) {
		System.out.println("erreur! Vous ne pouvez pas inserer cette quantite dans les tanks ,car la quantite disponible que tu peut l'inserer est :"+qteLibreLait);
		}
		else {
			
			Date date1=new Date();
			operation.setDateOperation(currentDateTime);
			operation.setTypeOp("Remplissage");
			operation.setChef(chefRepository.findAll().get(0));
		
			operationRepository.save(operation);
		
		for(int j=0;j<tankRepository.findAll().size();j++){
			Tank tank=tankRepository.findAll().get(j);
			s=tank.getPoidVide()-tank.getPoidActuel();
		if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0  && a>tank.getPoidVide()) {
			diff=tank.getPoidVide()-tank.getPoidActuel();
			tank.setPoidActuel(tank.getPoidVide());
			a=a-s;
			//tank.getOperations().add(operation);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(diff);
			operationTankRepository.save(opt);
		
			//operation.getTanks().add(tank);
			
			//operationRepository.save(operation);
		}
		if(a>0 && a<=(tank.getPoidVide()-tank.getPoidActuel())) {
			tank.setPoidActuel(tank.getPoidActuel()+a);
			
			//tank.getOperations().add(operation);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(a);
			operationTankRepository.save(opt);
			a=0;
		}
		}
		
		
			System.out.println("hahahaha : "+a);

				for(int i=0;i<tankRepository.findAll().size();i++) {
					Tank tank1=tankRepository.findAll().get(i);
					if(tank1.getPoidActuel()==0 && a>=tank1.getPoidVide()) {
						diff=tank1.getPoidVide()-tank1.getPoidActuel();
						tank1.setPoidActuel(tank1.getPoidVide()-tank1.getPoidActuel());
						//tank1.getOperations().add(operation);
						tankRepository.save(tank1);
						//operation.getTanks().add(tank1);
						//operationRepository.save(operation);
						OperationTank opt=new OperationTank(currentDateTime);
						opt.setOperation(operation);
						opt.setTank(tank1);
						opt.setQteInsereTank(diff);
						operationTankRepository.save(opt);
						a=a-tank1.getPoidVide();
						System.out.println("id tank : "+tank1.getIdTank());
						System.out.println(" a="+a);	
					}
					
					
					if(tank1.getPoidActuel()==0 && a<100 && a>0) {
						tank1.setPoidActuel(a);
						//tank1.getOperations().add(operation);
						tankRepository.save(tank1);
						//operation.getTanks().add(tank1);
						
						OperationTank opt=new OperationTank(currentDateTime);
						opt.setOperation(operation);
						opt.setTank(tank1);
						opt.setQteInsereTank(a);
						operationTankRepository.save(opt);
						a=0;
						System.out.println("id tank : "+tank1.getIdTank());
						System.out.println(" a="+a);	
						
					}
					
				}
				
				
				
				for(int i=0;i<tankRepository.findAll().size();i++) {
							
							Tank tank2=tankRepository.findAll().get(i);
							
							if(tank2.getPoidActuel()==tank2.getPoidVide()) {
							tank2.setEtat("Totalement remplis");
							tankRepository.save(tank2);
						
							}
							else if(tank2.getPoidActuel()==0) {
								tank2.setEtat("Non remplis");
								tankRepository.save(tank2);
								
								}
							else if(tank2.getPoidActuel()<tank2.getPoidVide()) {
								tank2.setEtat("En cours");
								tankRepository.save(tank2);
								}
						}
		}
			
		operation.setCode(null);
		operationRepository.save(operation);
		
		
			return operation;
		}
		
	
	
	
	@RequestMapping(value="/retrait",method = RequestMethod.POST)
	public Operation AddOperationRetrait(@RequestBody Operation operation){
	    double s=0;
		double a=operation.getPoidsLait();
		double p=0;
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
	     System.out.println(currentDateTime);
	Date date1=new Date();
	operation.setDateOperation(currentDateTime);
	operation.setTypeOp("Retrait");
	operation.setChef(chefRepository.findAll().get(0));
	operation.setCode(10000+operationRepository.findAll().size());
	operationRepository.save(operation);
	
	for(int j=0;j<tankRepository.findAll().size();j++){
		Tank tank=tankRepository.findAll().get(j);
		s=tank.getPoidVide()-tank.getPoidActuel();
		
		
		if(tank.getPoidActuel()>0 && a>0 && tank.getPoidActuel()<tank.getPoidVide() && a<tank.getPoidVide()  && a<=tank.getPoidActuel()) {
			p=tank.getPoidActuel()-a;
			
			tank.setPoidActuel(p);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(a*-1);
			operationTankRepository.save(opt);
			a=0;
			//operation.getTanks().add(tank);
		}
		
	}	
	
	
	for(int j=0;j<tankRepository.findAll().size();j++){
		Tank tank=tankRepository.findAll().get(j);
		s=tank.getPoidVide()-tank.getPoidActuel();
		
		
		if(a>0 && tank.getPoidActuel()==tank.getPoidVide() && a==tank.getPoidActuel()) {
			p=tank.getPoidActuel()-a;
			
			tank.setPoidActuel(p);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(a*-1);
			operationTankRepository.save(opt);
			a=0;
			//operation.getTanks().add(tank);
		}
		
	}
	
	for(int j=0;j<tankRepository.findAll().size();j++){
		Tank tank=tankRepository.findAll().get(j);
		s=tank.getPoidVide()-tank.getPoidActuel();
		
	if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0 && a>=tank.getPoidVide() ) {
		p=tank.getPoidActuel();
		a=a-tank.getPoidActuel();
		tank.setPoidActuel(0);
		tankRepository.save(tank);
		OperationTank opt=new OperationTank(currentDateTime);
		opt.setOperation(operation);
		opt.setTank(tank);
		opt.setQteInsereTank(p*-1);
		operationTankRepository.save(opt);
		//operation.getTanks().add(tank);
	}
	
	
	}
	
	
		System.out.println("hahahaha : "+a);

			for(int i=0;i<tankRepository.findAll().size();i++) {
				Tank tank1=tankRepository.findAll().get(i);
				if(tank1.getPoidActuel()==tank1.getPoidVide() && a>=tank1.getPoidVide() && a>0) {
					p=tank1.getPoidActuel();
					tank1.setPoidActuel(tank1.getPoidVide()-tank1.getPoidActuel());
					tankRepository.save(tank1);
					//operation.getTanks().add(tank1);
					OperationTank opt=new OperationTank(currentDateTime);
					opt.setOperation(operation);
					opt.setTank(tank1);
					opt.setQteInsereTank(p*-1);
					operationTankRepository.save(opt);
					a=a-tank1.getPoidVide();
					System.out.println("id tank : "+tank1.getIdTank());
					System.out.println(" a="+a);	
				}
				
				
				if(tank1.getPoidActuel()==tank1.getPoidVide() && a<tank1.getPoidVide() && a>0) {
					
					tank1.setPoidActuel(tank1.getPoidActuel()-a);
					tankRepository.save(tank1);
					//operation.getTanks().add(tank1);
					OperationTank opt=new OperationTank(currentDateTime);
					opt.setOperation(operation);
					opt.setTank(tank1);
					opt.setQteInsereTank(a*-1);
					operationTankRepository.save(opt);
					
					a=0;
					System.out.println("id tank : "+tank1.getIdTank());
					System.out.println(" a="+a);	
					
				}
				
			}
			
			
			
			
			for(int i=0;i<tankRepository.findAll().size();i++) {
						
						Tank tank2=tankRepository.findAll().get(i);
						
						if(tank2.getPoidActuel()==tank2.getPoidVide()) {
						tank2.setEtat("Totalement remplis");
						tankRepository.save(tank2);
						}
						else if(tank2.getPoidActuel()==0) {
							tank2.setEtat("Non remplis");
							tankRepository.save(tank2);
							}
						else if(tank2.getPoidActuel()<tank2.getPoidVide()) {
							tank2.setEtat("En cours");
							tankRepository.save(tank2);
							}
						
						
					}

		
    operation.setCode(operation.getCode()+operationRepository.findAll().size());
	return operationRepository.save(operation);
}

	
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.PUT)
	public ResponseEntity<Operation>  EditOperation(@PathVariable Integer idOperation, @RequestBody Operation operation){
		

		
		Operation o=operationRepository.findById(idOperation).get();
		for( int i=0;i<operationRepository.find(idOperation).size();i++) {
			OperationTank opt=operationRepository.find(idOperation).get(i);
			if(idOperation==opt.getOperation().getIdOperation()) {
		
    		Tank t=tankRepository.findById(opt.getTank().getIdTank()).get();
    		System.out.println(t.getIdTank());
    		t.setPoidActuel((t.getPoidActuel()-opt.getQteInsereTank()));
    		tankRepository.save(t);
//			//o.setPoidsLait(operation.getPoidsLait());
			o.setIdOperation(idOperation);
			operationRepository.save(o);
		}
		}
		operationRepository.deleteOpTank(idOperation);
		operationRepository.deleteOp(idOperation);
    	AddOperationRemplissage(operation);
//		o.setPoidsLait(operation.getPoidsLait());
//		o.setDateOperation(operation.getDateOperation());
		
		 return ResponseEntity.ok(operation);
	    }
	
	
	@RequestMapping(value="/operationsR/{idOperation}",method = RequestMethod.PUT)
	public ResponseEntity<Operation>  EditOperationRetrait(@PathVariable Integer idOperation, @RequestBody Operation operation){
		
		Operation o=operationRepository.findById(idOperation).get();
		for( int i=0;i<operationRepository.find(idOperation).size();i++) {
			OperationTank opt=operationRepository.find(idOperation).get(i);
			if(idOperation==opt.getOperation().getIdOperation()) {
		
    		Tank t=tankRepository.findById(opt.getTank().getIdTank()).get();
    		System.out.println(t.getIdTank());
    		t.setPoidActuel((t.getPoidActuel()-opt.getQteInsereTank()));
    		tankRepository.save(t);
//			//o.setPoidsLait(operation.getPoidsLait());
			o.setIdOperation(idOperation);
			operationRepository.save(o);
		}
		}
		operationRepository.deleteOpTank(idOperation);
		operationRepository.deleteOp(idOperation);
    	AddOperationRetrait(operation);
//		o.setPoidsLait(operation.getPoidsLait());
//		o.setDateOperation(operation.getDateOperation());
		
		 return ResponseEntity.ok(operation);
	    }
	
	
	@RequestMapping(value="/operationsTank",method = RequestMethod.GET)
	public List<OperationTank> getOperationsTanks(){
		return operationRepository.findAllOperationsTank();
	}
	
	@RequestMapping(value="/operationsRemplissages",method = RequestMethod.GET)
	public List<Operation> getOperationsRemplissages(){
		return operationRepository.findAllOperationsRemplissages("Remplissage");
	}
	
	@RequestMapping(value="/operationsRetrait",method = RequestMethod.GET)
	public List<Operation> getOperationsRetraits(){
		return operationRepository.findAllOperationsRemplissages("Retrait");
	}

	@RequestMapping(value="/nbreOp",method = RequestMethod.GET)
	public int getNbreOperations(){
		return operationRepository.findAll().size();
	}
	
	
}


