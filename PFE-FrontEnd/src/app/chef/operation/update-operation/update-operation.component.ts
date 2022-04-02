import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { Operation } from 'src/app/Models/operation';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import { OperationService } from 'src/app/Services/operation.service';
import { Observable } from 'rxjs';
import { TankService } from 'src/app/Services/tank.service';

@Component({
  selector: 'app-update-operation',
  templateUrl: './update-operation.component.html',
  styleUrls: ['./update-operation.component.css']
})
export class UpdateOperationComponent implements OnInit {
  operation:Operation=new Operation();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;
  agriculteurs!:Observable<Agriculteur[]>;
  laitOp=0;
    // qte de lait restante pour chaque vache
    qteRsetLait=0;
    //qte restante de lait pour un tank
    qteRsetLaitTank=0;
    msgErreur=0;
    msgErreur2=0;
    RestQte=0;

  constructor(
    private dialogClose: MatDialog,
    private operationService:OperationService,
    private agriculteurService:AgriculteurService,
    private tankService:TankService,
  ) { }

  ngOnInit(): void {

    this.ValidatedForm();
    this.operationService.getOperation(JSON.parse(localStorage.getItem('IdOperation') || '[]') || []).subscribe(o =>{
      this.operation = o;
      this.laitOp=o.poidsLait;
      console.log(this.operation);
      console.log(this.laitOp);
    });

    this.agriculteurs=this.agriculteurService.getAgriculteurs();

  }

  updateOperation(){

    // this.tankService.getTanksQteGenerale().subscribe(
    //   a=>{
    //     this.RestQte=a;
    //   console.log(a);
 

    this.tankService.getQteLibreAujourdhui().subscribe(

      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=(o+this.laitOp)){

    this.operationService
        .updateOperation(this.operation.idOperation,{
          "poidsLait":this.myForm.get('poidsLait')?.value,
          //  "dateOperation":this.myForm.get('dateOperation')?.value,
          "agriculteur":{
            "idAgriculteur":this.myForm.get('agriculteur')?.value,
         },
        })
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succes"]));
          window.location.reload();
          console.log(this.operation);
        },
        (error) => {
          console.log("Failed")
        }
      );
      }
      else{
        this.msgErreur=1;
        this.qteRsetLait=o+this.laitOp;
        }
  
        
    });

  // }
  // );
  
    }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'poidsLait' : new FormControl(null,[Validators.required,]),
      // 'dateOperation' : new FormControl(null,[Validators.required, ]),
      'agriculteur' : new FormControl(null,[Validators.required, ]),

      });
 }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}

// get dateOperation(){
//   return this.myForm.get('dateOperation') ;
// }

get agriculteur(){
  return this.myForm.get('agriculteur') ;
}


  onClose() {
    this.dialogClose.closeAll();
  }

}
