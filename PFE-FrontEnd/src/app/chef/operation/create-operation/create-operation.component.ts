import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';

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
     // dateOperation : new FormControl(null,[Validators.required ]),
      // agriculteur : new FormControl(null,[Validators.required ]),
      agriculteur : new FormControl(null,[Validators.required ]),
      // lait : new FormControl(null,[Validators.required ]),

  })
  
  tanks!:Observable<Tank[]>;
  agriculteurs!:Observable<Agriculteur[]>;

  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private agriculteurService:AgriculteurService, 
    private router: Router,
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.tanks=this.tankService.getTanks();
    this.agriculteurs=this.agriculteurService.getAgriculteurs();

    this.tankService.getTanksQteLibre().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o)
      this.msgErreur=0;
      else{
        this.msgErreur=1;
      this.qteRsetLait=o;
      }

      
  });

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

    if(this.myForm.get('poidsLait')?.value!=null && this.myForm.get('agriculteur')?.value!=null ){

    this.operationService
        .createOperationRemplissage(
          {
            "poidsLait":this.myForm.get('poidsLait')?.value,
            "agriculteur":{
              "idAgriculteur":this.myForm.get('agriculteur')?.value,
           },
  
          }
        )
        .subscribe(o=>{
          window.location.reload();
          console.log(this.operation);

          localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
          window.location.reload();      
        },
        (error) => {
          console.log("Failed")
        }
      );
    
      } 
  }


  onSubmit() {
    //this.submitted = true;
    this.tankService.getTanksQteLibre().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o){
      this.save();
      this.msgErreur=0;
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


}

