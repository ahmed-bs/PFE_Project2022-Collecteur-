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
let Remplissage = require('../../../../../build/contracts/RemplissageCol.json');
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
          
         this.tab = Object.values(o)
          localStorage.setItem('idOP',this.tab[0])

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
          this.reLoad() 
        if(this.myForm.get('poidsLait')?.value<=o)
        this.msgErreur=0;
        else{
        this.msgErreur=1;
        this.qteRsetLait=o;
        }
  var kk=JSON.parse(localStorage.getItem('idOP') || '[]') || []
        this.operationService.getOpTank(kk).subscribe( i=>{  
           this.tabTankId=Object.values(i);
         // this.length=this.ELEMENT_DATA?.length

  localStorage.setItem('tabTankId',JSON.stringify(this.tabTankId))
  this.reLoad()
  console.log("this.tabTankId---------------------------------");
  console.log(this.tabTankId);
  this.reLoad() 
               });
  
      
  
  
    });
  }



   count!: number;
  elem0: OperationTank[] = [];
 //usine:Usine = new Usine();
  async saveInBc(){
    const depKEY=Object.keys(Remplissage.networks)[0];
    await this.requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer);
    this.elem0=JSON.parse(localStorage.getItem('tabTankId') || '[]') || []  ;

    this.count=this.elem0.length


    const transaction = await contract.addOperationTank(this.elem0,this.count);
      
    await transaction.wait() ; 



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
      this.saveInBc();
      }
      else{
      this.msgErreur=1;
      this.qteRsetLait=o;
      }
     

  });

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

