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
  msgErreur=0;
  qteActLaitTank=0;
  qteMax=0;
  som=0;
  myForm=new  FormGroup({
       poidsLait : new FormControl(null,[Validators.required,Validators.min(1)]),
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

    if(this.myForm.get('poidsLait')?.value==null || this.myForm.get('usine')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }

     if(this.myForm.get('poidsLait')?.value!=null && this.myForm.get('usine')?.value!=null && this.myForm.get('poidsLait')?.value>=1 ){

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
      window.location.reload();
      console.log(this.operation);     
      localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
      window.location.reload();      
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

