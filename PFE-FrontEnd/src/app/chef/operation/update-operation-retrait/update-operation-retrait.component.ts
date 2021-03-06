import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Usine } from 'src/app/Models/usine';
import { Operation } from 'src/app/Models/operation';
import { UsineService } from 'src/app/Services/usine.service';
import { OperationService } from 'src/app/Services/operation.service';
import { Observable } from 'rxjs';
import { TankService } from 'src/app/Services/tank.service';
import {Location} from "@angular/common";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-operation-retrait',
  templateUrl: './update-operation-retrait.component.html',
  styleUrls: ['./update-operation-retrait.component.css']
})
export class UpdateOperationRetraitComponent implements OnInit {
  operation:Operation=new Operation();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;
  usines!:Observable<Usine[]>;
  msgErreur=0;
  qteActLaitTank=0;
  qte=0;

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private operationService:OperationService,
    private usineService:UsineService,
    private location:Location,
    private router: Router,
    private tankService:TankService,
  ) { 
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
  }

  ngOnInit(): void {

    this.ValidatedForm();
    this.operationService.getOperation(JSON.parse(localStorage.getItem('IdOperation') || '[]') || []).subscribe(o =>{
      this.operation = o;
      this.qte=o.poidsLait;
      console.log(this.operation);
    });

    this.usines=this.usineService.getUsines();

  }

  updateOperation(){

    this.tankService.getQteG().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o+this.qte){

    this.operationService
        .updateOperationR(this.operation.idOperation,{
          "poidsLait":this.myForm.get('poidsLait')?.value,
          "usine":{
            "idUsine":this.myForm.get('usine')?.value,
         },
        })
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a ??t?? ajout?? avec succes"]));
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
        this.qteActLaitTank=o+this.qte;
        }
    });
  }
  ValidatedForm(){
    this.myForm = new FormGroup({
      'poidsLait' : new FormControl(null,[Validators.required,]),
      'usine' : new FormControl(null,[Validators.required, ]),

      });
 }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}

get dateOperation(){
  return this.myForm.get('dateOperation') ;
}

get usine(){
  return this.myForm.get('usine') ;
}


onReload(){
  // this.router.navigate([this.router.url]);
  this.router.navigateByUrl("/'agriculteur/bon/listeCollecteur",{skipLocationChange: true}).then( response=> {
    this.router.navigate([decodeURI(this.location.path())]);
  })
}


onClose() {
this.dialogClose.closeAll();
// this.gotoList();
this.onReload();
}
}
