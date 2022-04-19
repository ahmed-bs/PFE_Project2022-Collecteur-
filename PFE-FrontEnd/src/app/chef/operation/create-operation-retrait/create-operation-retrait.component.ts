import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import { Usine } from 'src/app/Models/usine';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { UsineService } from 'src/app/Services/usine.service';
import { DatePipe } from '@angular/common';

import { ethers } from 'ethers';
import { OperationTank } from 'src/app/Models/operationTank';
import { Chef } from 'src/app/Models/chef';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/Remplissage.json');
@Component({
  selector: 'app-create-operation-retrait',
  templateUrl: './create-operation-retrait.component.html',
  styleUrls: ['./create-operation-retrait.component.css'],
  providers: [DatePipe]
})
export class CreateOperationRetraitComponent implements OnInit {

  operation:Operation = new Operation();
  t:Tank=new Tank();
  submitted = false;
  msg="";
  tab!: any[];
  tabTankId!: any[];
  qteRsetLait=0;
  msgErreur=0;
  qteActLaitTank=0;
  qteMax=0;
  som=0;
  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required]),
     // dateOperation : new FormControl(null,[Validators.required ]),
       usine : new FormControl(null,[Validators.required ]),
    
  })
  tanks!:Observable<Tank[]>;
  usines!:Observable<Usine[]>;

  maDate = new Date();


  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private router: Router,
    private usineService:UsineService, 
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.tanks=this.tankService.getTanksFiltres();
    this.usines=this.usineService.getUsines();
    this.operationService.getNbOp().subscribe(o=>{
    console.log(o);
    this.som=10000+o+1;  
    });

    console.log(this.maDate);
    // var transformDate = DatePipe.transform(this.maDate, 'yyyy-MM-dd');

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
  
     if(this.myForm.get('usine')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }


     if(this.myForm.get('poidsLait')?.value!=null && this.myForm.get('usine')?.value!=null ){

    this.operationService
    .createOperation(
      {
        "poidsLait":this.myForm.get('poidsLait')?.value,
        "usine":{
          "idUsine":this.myForm.get('usine')?.value,
       },
       "code":this.som,
        },
      
    )
    .subscribe(o=>{
      this.usineService.getUsine(this.myForm.get('usine')?.value).subscribe(
        b=>{
          console.log(b)
          localStorage.setItem('idUsine',b.idUsine)
          localStorage.setItem('nomUsine',b.nomUsine)
          localStorage.setItem('adresse',b.adresse)
        }
      )
      this.reLoad(); 
      this.tab = Object.values(o)
      localStorage.setItem('idOP',this.tab[0]);
      console.log(this.operation);     
      localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
      this.reLoad();      
    },
    (error) => {
      console.log("Failed")
    }
  );
    //  ****************   Tank    ******************
//     let bb=this.tankService.getTank(this.myForm.get('tank')?.value).subscribe(o=>{
//       this.t=o;
//       console.log(o);
//       console.log(this.t);
//       console.log(o.poidActuel);
// if(o.poidActuel<this.myForm.get('poidsLait')?.value){
// this.msgErreur=1;
// this.qteActLaitTank=o.poidActuel;
//     }
// else
// this.msgErreur=0;
//     });
// if(this.qteActLaitTank>=this.myForm.get('poidsLait')?.value){

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
  /*    localStorage.setItem('idAgriculteur',this.tabTankId[0].operation.agriculteur.idAgriculteur)
      localStorage.setItem('noma',this.tabTankId[0].operation.agriculteur.nom)
      localStorage.setItem('prenoma',this.tabTankId[0].operation.agriculteur.prenom)
      localStorage.setItem('emaila',this.tabTankId[0].operation.agriculteur.email)
      localStorage.setItem('adressea',this.tabTankId[0].operation.agriculteur.adress)
      localStorage.setItem('tela',this.tabTankId[0].operation.agriculteur.tel)*/

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


  async  requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }


  pooperation:Operation = new Operation();
 chefc:Chef = new Chef();
 tankt:Tank = new Tank();
 usine2:Usine = new Usine();
  async saveInBc(){
    const depKEY=Object.keys(Remplissage.networks)[0];
    await this.requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)

 



/*
    this.agriculteura.idAgriculteur=JSON.parse(localStorage.getItem('idAgriculteur') || '[]') || [] 
    this.agriculteura.nom=JSON.parse(JSON.stringify(localStorage.getItem('noma') )|| '[]') || [] 
    this.agriculteura.prenom=JSON.parse(JSON.stringify(localStorage.getItem('prenoma') )|| '[]') || [] 
    this.agriculteura.email=JSON.parse(JSON.stringify(localStorage.getItem('emaila') )|| '[]') || [] 
    this.agriculteura.adress=JSON.parse(JSON.stringify(localStorage.getItem('adressea') )|| '[]') || [] 
    this.agriculteura.tel=JSON.parse(localStorage.getItem('tela') || '[]') || [] 
    console.log("55555555555555555555555555555555555555555555");
    console.log( this.agriculteura);
*/


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


    this.usine2.idUsine=JSON.parse(localStorage.getItem('idUsine') || '[]') || []  ;
    this.usine2.nomUsine=JSON.parse(JSON.stringify(localStorage.getItem('nomUsine') )|| '[]') || [] ;
    this.usine2.adresse=JSON.parse(JSON.stringify(localStorage.getItem('adresse') )|| '[]') || [] ;
  

    this.pooperation.tank=this.tankt;
 //   this.pooperation.agriculteur=this.agriculteura;
    this.pooperation.chef=this.chefc;
    this.pooperation.usine=this.usine2;


    // this.elem.operation.usine=this.usine;
    // this.elem.operation.chef=this.chefc;
    // this.elem.operation.agriculteur=this.agriculteura;
    console.log("999999999999999999999999999999999999999999999999999999");



  //  console.log(this.elem);

   

    const transaction = await contract.addOperationTankRetrait(this.pooperation);
      
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







  reLoad(){
    this.router.navigate([this.router.url])
  }
  onSubmit() {
    this.tankService.getQteTanks().subscribe(
      a=>{
    this.tankService.getQteG().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o  ){
      this.save();
      this.msgErreur=0;
      this.saveInBc();
    }
      else{
      this.msgErreur=1;
      this.qteActLaitTank=o;
      this.qteMax=a;
          }
  });
});
}

  gotoList() {
    this.router.navigate(['chef/operation/listeOperationRetrait']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}


get usine(){
  return this.myForm.get('usine') ;
}

}

