import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { Operation } from 'src/app/Models/operation';
import { OperationTank } from 'src/app/Models/operationTank';
import { Tank } from 'src/app/Models/tank';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';

import { ethers } from 'ethers';
import { Chef } from 'src/app/Models/chef';
import { Usine } from 'src/app/Models/usine';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/Remplissage.json');
@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css']
})
export class CreateOperationComponent implements OnInit {
  operation:Operation = new Operation();
  submitted = false;
  msg="";
  t:Tank=new Tank();
  msgErreur=0;
  msgErreur2=0;
  // qte de lait restante pour chaque vache
  qteRsetLait=0;
  //qte restante de lait pour un tank
  qteRsetLaitTank=0;
  valeur1=0;
  valeur2=0;
  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required]),
      code : new FormControl(null,[Validators.required ]),
     // dateOperation : new FormControl(null,[Validators.required ]),
      // agriculteur : new FormControl(null,[Validators.required ]),
      agriculteur : new FormControl(null,[Validators.required ]),
     

  })

  tanks!:Observable<Tank[]>;
  agriculteurs!:Observable<Agriculteur[]>;

  length=0;

  ELEMENT_DATA!:OperationTank[];

  tab!: any[];
  tabTankId!: any[];
  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private agriculteurService:AgriculteurService,
    private router: Router,
    private dialogClose: MatDialog) { }

  async ngOnInit() {
    //this.ValidatedForm();
    this.tanks=this.tankService.getTanks();
    this.agriculteurs=this.agriculteurService.getAgriculteurs();



  }






  async  requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }




  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {


  if(this.myForm.get('poidsLait')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   if(this.myForm.get('agriculteur')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   
   if(this.myForm.get('code')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

    if(this.myForm.get('poidsLait')?.value!=null && this.myForm.get('agriculteur')?.value!=null && this.myForm.get('code')?.value!=null ){

    this.operationService
        .createOperationRemplissage(
          {
            "poidsLait":this.myForm.get('poidsLait')?.value,
            "code":this.myForm.get('code')?.value,
            "agriculteur":{
              "idAgriculteur":this.myForm.get('agriculteur')?.value,
           },

          }
        )
        .subscribe(o=>{
          this.reLoad() 
          
         this.tab = Object.values(o)
          localStorage.setItem('idOP',this.tab[0]);

          localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
          this.reLoad() 
        },
        (error) => {
          console.log("Failed")
        }
      );

      }
      this.tankService.getTanksQteLibre().subscribe(
        o=>{
        console.log(o);
        if(this.myForm.get('poidsLait')?.value<=o)
        this.msgErreur=0;
        else{
        this.msgErreur=1;
        this.qteRsetLait=o;
        }
  var kk=JSON.parse(localStorage.getItem('idOP') || '[]') || []
  console.log("///////////////////////////////////////////000000");
  console.log(kk);
  
  
        this.operationService.getOpTank(kk).subscribe( i=>{
          
           this.tabTankId = Object.values(i)
         // this.length=this.ELEMENT_DATA?.length;
         localStorage.setItem('idOpTank',this.tabTankId[0].idOpTank)
         console.log("///////////////////////////////////////////1111111111");
         console.log(this.tabTankId[0]);
         localStorage.setItem('idOpTank',this.tabTankId[0].idOpTank)
         localStorage.setItem('poid',this.tabTankId[0].qteInsereTank)
         localStorage.setItem('date',this.tabTankId[0].date)

         //operatuin chef
         localStorage.setItem('idChef',this.tabTankId[0].operation.chef.idChef)
         localStorage.setItem('nomc',this.tabTankId[0].operation.chef.nom)
         localStorage.setItem('prenomc',this.tabTankId[0].operation.chef.prenom)
         localStorage.setItem('emailc',this.tabTankId[0].operation.chef.email)
         localStorage.setItem('adressec',this.tabTankId[0].operation.chef.adress)
         localStorage.setItem('telc',this.tabTankId[0].operation.chef.tel)
         localStorage.setItem('cinc',this.tabTankId[0].operation.chef.cin)
         localStorage.setItem('usernamec',this.tabTankId[0].operation.chef.username)
         localStorage.setItem('passwordc',this.tabTankId[0].operation.chef.password)
      
        //operation agriculter
        localStorage.setItem('idAgriculteur',this.tabTankId[0].operation.agriculteur.idAgriculteur)
        localStorage.setItem('noma',this.tabTankId[0].operation.agriculteur.nom)
        localStorage.setItem('prenoma',this.tabTankId[0].operation.agriculteur.prenom)
        localStorage.setItem('emaila',this.tabTankId[0].operation.agriculteur.email)
        localStorage.setItem('adressea',this.tabTankId[0].operation.agriculteur.adress)
        localStorage.setItem('tela',this.tabTankId[0].operation.agriculteur.tel)

 ///operation 
         localStorage.setItem('idOperation',this.tabTankId[0].operation.idOperation)
         localStorage.setItem('poidsLait',this.tabTankId[0].operation.poidsLait)
         localStorage.setItem('dateOperation',this.tabTankId[0].operation.dateOperation)
         localStorage.setItem('typeOp',this.tabTankId[0].operation.typeOp)
          localStorage.setItem('code',this.tabTankId[0].operation.code)
    


        //tank
        localStorage.setItem('idTank',this.tabTankId[0].tank.idTank)
        localStorage.setItem('matricule',this.tabTankId[0].tank.matricule)
        localStorage.setItem('poidVide',this.tabTankId[0].tank.poidVide)
        localStorage.setItem('poidActuel',this.tabTankId[0].tank.poidActuel)
        localStorage.setItem('etat',this.tabTankId[0].tank.etat)

               });
  
      
  
  
    });
  }




  elem:OperationTank= new OperationTank();
  pooperation:Operation = new Operation();
 agriculteura:Agriculteur = new Agriculteur();
 chefc:Chef = new Chef();
 tankt:Tank = new Tank();
 //usine:Usine = new Usine();
  async saveInBc(){
    const depKEY=Object.keys(Remplissage.networks)[0];
    await this.requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)

    //this.elem=JSON.parse(localStorage.getItem('ssss') || '[]') || []
    
    this.elem.idOpTank= parseInt(JSON.parse(localStorage.getItem('idOpTank') || '[]') || [])  ;
    this.elem.qteInsereTank=JSON.parse(localStorage.getItem('poid') || '[]') || [] 
    this.elem.date=JSON.parse(JSON.stringify(localStorage.getItem('date') )|| '[]') || [] 

    console.log("1111111111111111111111111111111111111111111");
    console.log(this.elem);



    this.agriculteura.idAgriculteur=JSON.parse(localStorage.getItem('idAgriculteur') || '[]') || [] 
    this.agriculteura.nom=JSON.parse(JSON.stringify(localStorage.getItem('noma') )|| '[]') || [] 
    this.agriculteura.prenom=JSON.parse(JSON.stringify(localStorage.getItem('prenoma') )|| '[]') || [] 
    this.agriculteura.email=JSON.parse(JSON.stringify(localStorage.getItem('emaila') )|| '[]') || [] 
    this.agriculteura.adress=JSON.parse(JSON.stringify(localStorage.getItem('adressea') )|| '[]') || [] 
    this.agriculteura.tel=JSON.parse(localStorage.getItem('tela') || '[]') || [] 
    console.log("55555555555555555555555555555555555555555555");
    console.log( this.agriculteura);

    this.chefc.idChef=JSON.parse(localStorage.getItem('idChef') || '[]') || [] 
    this.chefc.nom=JSON.parse(JSON.stringify(localStorage.getItem('nomc') )|| '[]') || [] 
    this.chefc.prenom=  "testuin"           //JSON.parse(JSON.stringify(localStorage.getItem('prenomc') )|| '[]') || [] 
    this.chefc.email=    "testuin"              //JSON.parse(JSON.stringify(localStorage.getItem('emailc') )|| '[]') || [] 
    this.chefc.adress=JSON.parse(JSON.stringify(localStorage.getItem('adressec') )|| '[]') || [] 
    this.chefc.tel=JSON.parse(localStorage.getItem('telc') || '[]') 
    this.chefc.cin=JSON.parse(localStorage.getItem('cinc') || '[]') || [] 
    this.chefc.username=JSON.parse(JSON.stringify(localStorage.getItem('usernamec') )|| '[]') || [] 
    this.chefc.password=JSON.parse(JSON.stringify(localStorage.getItem('passwordc') )|| '[]') || [] 
    console.log("666666666666666666666666666666666666666666666666");
    console.log( this.chefc);

    this.tankt.idTank=JSON.parse(localStorage.getItem('idTank') || '[]') || [] 
    this.tankt.matricule=JSON.parse(JSON.stringify(localStorage.getItem('matricule') )|| '[]') || [] 
    this.tankt.poidVide=JSON.parse(localStorage.getItem('poidVide') || '[]') || [] 
    this.tankt.poidActuel=JSON.parse(localStorage.getItem('poidActuel') || '[]') || [] 
    this.tankt.etat=JSON.parse(JSON.stringify(localStorage.getItem('etat') )|| '[]') || [] 
    console.log("77777777777777777777777777777777777777777777777777");
    console.log( this.tankt);

    this.pooperation.idOperation=JSON.parse(localStorage.getItem('idOperation') || '[]') || [] 
    this.pooperation.dateOperation=JSON.parse(JSON.stringify(localStorage.getItem('dateOperation') )|| '[]') || [] 
    this.pooperation.poidsLait=JSON.parse(localStorage.getItem('poidsLait') || '[]') || [] 
    this.pooperation.typeOp=JSON.parse(JSON.stringify(localStorage.getItem('typeOp') )|| '[]') || [] 
    this.pooperation.code=JSON.parse(localStorage.getItem('code') || '[]') || []  
    console.log("888888888888888888888888888888888888888888888888888");
    console.log(this.pooperation);

/*
    this.usine.idUsine=1;
    this.usine.nomUsine="kfkkf";
    this.usine.adresse="hjhfh";
  this.pooperation.usine=this.usine;
*/


    this.elem.tank=this.tankt;
    this.pooperation.tank=this.tankt;
    this.pooperation.agriculteur=this.agriculteura;
   this.pooperation.chef=this.chefc;
    this.elem.operation=this.pooperation;


    // this.elem.operation.usine=this.usine;
    // this.elem.operation.chef=this.chefc;
    // this.elem.operation.agriculteur=this.agriculteura;
    console.log("999999999999999999999999999999999999999999999999999999");



    console.log(this.elem);

   

    const transaction = await contract.addOperationTank(this.pooperation);
      
    await transaction.wait() ; 
/*
    this.oppr.poidsLait=JSON.parse(localStorage.getItem('poid') || '[]') || []
    this.oppr.dateOperation=JSON.parse(JSON.stringify(localStorage.getItem('date') )|| '[]') || []
    this.oppr.typeOp=JSON.parse(JSON.stringify(localStorage.getItem('type'))|| '[]') || []
    this.oppr.code=JSON.parse(localStorage.getItem('code') || '[]') || []
   
    this.collect.nomCollecteur=JSON.parse(JSON.stringify(localStorage.getItem('nomcoll') )|| '[]') || []
    this.collect.adresse=JSON.parse(JSON.stringify(localStorage.getItem('address') )|| '[]') || []
    this.collect.tel=JSON.parse(localStorage.getItem('tel') || '[]') || []
    this.collect.idCollecteur=JSON.parse(localStorage.getItem('idcoll') || '[]') || []
    
  var s1=JSON.parse(JSON.stringify(localStorage.getItem('agriconom') )|| '[]') || []
  //  this.oppr.agriculteur.nom=this.agri.nom;
  var s2=JSON.parse(JSON.stringify(localStorage.getItem('agricoprenom') )|| '[]') || ''  
   // this.oppr.agriculteur.type='0'
   // this.oppr.agriculteur.username='0'
  //  this.oppr.agriculteur.password='0'
var s3 =s1 +" "+ s2 

console.log("var3");
console.log(s3);
this.oppr.sender=s3

    console.log("this.collect");
    console.log(this.collect);

    this.oppr.collecteur=this.collect;
   // this.oppr.collecteur.nomCollecteur =JSON.parse(JSON.stringify(localStorage.getItem('nomcoll') )|| '[]') || [];
   // this.oppr.collecteur.adresse=JSON.parse(JSON.stringify(localStorage.getItem('address') )|| '[]') || []
   // this.oppr.collecteur.tel=JSON.parse(localStorage.getItem('tel') || '[]') || []
    //this.oppr.collecteur.idCollecteur=JSON.parse(localStorage.getItem('idcoll') || '[]') || []
    console.log("this.oppr");
    console.log(this.oppr);
*/



    }







  onSubmit() {
    //this.submitted = true;
    this.tankService.getTanksQteLibre().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o){
      this.save();
      this.reLoad();
      this.msgErreur=0;
      }
      else{
      this.msgErreur=1;
      this.qteRsetLait=o;
      }
     

  });
  this.saveInBc();
  }

  gotoList() {
    this.router.navigate(['chef/operation/listeOperation']);
  }

  reLoad(){
    this.router.navigate([this.router.url])
  }
  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}


get agriculteur(){
  return this.myForm.get('agriculteur') ;
}


get code(){
  return this.myForm.get('code') ;
}

get tank(){
  return this.myForm.get('tank') ;
}

}

