import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usine } from 'src/app/Models/usine';
import { UsineService } from 'src/app/Services/usine.service';

@Component({
  selector: 'app-create-usine',
  templateUrl: './create-usine.component.html',
  styleUrls: ['./create-usine.component.css']
})
export class CreateUsineComponent implements OnInit {

  usine:Usine = new Usine();
  submitted = false;
  msg="";
  msgErreur=0;
  qteAct=0;

  myForm=new  FormGroup({
      nomUsine : new FormControl(null,[Validators.required]),
      adresse : new FormControl(null,[Validators.required ]),
  })


  constructor(
     private usineService: UsineService,
     private router: Router, 
     private dialogClose: MatDialog,) { }

  ngOnInit() {

  }

  newUsine(): void {
    this.submitted = false;
    this.usine = new Usine();
  }

  save() {

   if(this.myForm.get('nomUsine')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
   }
   else{
    this.msg="";
   }

   if(this.myForm.get('adresse')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }
  
   if( this.myForm.get('adresse')?.value!=null && this.myForm.get('nomUsine')?.value!=null ){

    this.usineService
        .createUsine({
          "nomUsine":this.myForm.get('nomUsine')?.value,
          "adresse":this.myForm.get('adresse')?.value,
        })
        .subscribe(o=>{
          window.location.reload();
          console.log(this.usine);
          localStorage.setItem('Toast', JSON.stringify(["Success","Une usine a été ajouté avec succès"]));
          window.location.reload();      
        });
    }
  }


  onSubmit() {
        this.save();
  }

  gotoList() {
    this.router.navigate(['chef/usine/listeUsine']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get nomUsine(){
  return this.myForm.get('nomUsine') ;
}

get adresse(){
  return this.myForm.get('adresse') ;
}


}

