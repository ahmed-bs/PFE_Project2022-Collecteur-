import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Usine } from 'src/app/Models/usine';
import { UsineService } from 'src/app/Services/usine.service';

@Component({
  selector: 'app-update-usine',
  templateUrl: './update-usine.component.html',
  styleUrls: ['./update-usine.component.css']
})
export class UpdateUsineComponent implements OnInit {
  usine:Usine=new Usine();
  // myForm!:FormGroup;
   CheckesCompetance:boolean=false;
   msg="";

   myForm=new  FormGroup({
    nomUsine : new FormControl(null,[Validators.required,Validators.minLength(3)]),
    adresse : new FormControl(null,[Validators.required,Validators.minLength(4) ]),
})


   constructor(
     private dialogClose: MatDialog,
     private usineService:UsineService,

   ) { }

   ngOnInit(): void {
     //this.ValidatedForm();
     this.usineService.getUsine(JSON.parse(localStorage.getItem('IdUsine') || '[]') || []).subscribe(o =>{
       this.usine = o;
       console.log(this.usine);
     });

   }

   updateUsine(){
    if(this.myForm.get('nomUsine')?.value==null || this.myForm.get('adresse')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }
    
     if( this.myForm.get('adresse')?.value!=null && this.myForm.get('nomUsine')?.value!=null && 
         this.myForm.get('adresse')?.value.length>=4 && this.myForm.get('nomUsine')?.value.length>=3){

     this.usineService
     // .updateusine(this.usine.idusine,this.usine)
         .updateUsine(this.usine.idUsine,{
           "nomUsine":this.myForm.get('nomUsine')?.value,
           "adresse":this.myForm.get('adresse')?.value,
         })
         .subscribe(o=>{
           localStorage.setItem('Toast', JSON.stringify(["Success","Une usine a été modifié avec succes"]));
           window.location.reload();
           console.log(this.usine);
         },
         (error) => {
           console.log("Failed")
         });
        }
      }
    

  get nomUsine(){
   return this.myForm.get('nomUsine') ;
 }

 get adresse(){
  return this.myForm.get('adresse') ;
}

   onClose() {
     this.dialogClose.closeAll();
   }

 }

