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

   myForm=new  FormGroup({
     nomUsine : new FormControl(null,[Validators.required]),
     adresse : new FormControl(null,[Validators.required ]),
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
         }
       );
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

