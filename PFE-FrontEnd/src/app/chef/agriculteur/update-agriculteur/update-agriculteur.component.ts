  import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';

@Component({
  selector: 'app-update-agriculteur',
  templateUrl: './update-agriculteur.component.html',
  styleUrls: ['./update-agriculteur.component.css']
})
export class UpdateAgriculteurComponent implements OnInit {
  agriculteur:Agriculteur=new Agriculteur();
  // myForm!:FormGroup;
   CheckesCompetance:boolean=false;

   myForm=new  FormGroup({
     nom : new FormControl(null,[Validators.required]),
     prenom : new FormControl(null,[Validators.required ]),
     email : new FormControl(null,[Validators.required ]),
     adress : new FormControl(null,[Validators.required ]),
     tel : new FormControl(null,[Validators.required ]),

 })


   constructor(
     private dialogClose: MatDialog,
     private agriculteurService:AgriculteurService,

   ) { }

   ngOnInit(): void {
     //this.ValidatedForm();
     this.agriculteurService.getAgriculteur(JSON.parse(localStorage.getItem('IdAgriculteur') || '[]') || []).subscribe(o =>{
       this.agriculteur = o;
       console.log(this.agriculteur);
     });

   }

   updateAgriculteur(){

     this.agriculteurService
     // .updateAgriculteur(this.Agriculteur.idAgriculteur,this.Agriculteur)
         .updateAgriculteur(this.agriculteur.idAgriculteur,{
           "nom":this.myForm.get('nom')?.value,
           "prenom":this.myForm.get('prenom')?.value,
           "email":this.myForm.get('email')?.value,
           "adress":this.myForm.get('adress')?.value,
           "tel":this.myForm.get('tel')?.value,

         })
         .subscribe(o=>{
           localStorage.setItem('Toast', JSON.stringify(["Success","Un Agriculteur a été modifié avec succes"]));
           window.location.reload();
           console.log(this.agriculteur);
         },
         (error) => {
           console.log("Failed")
         }
       );
   }

  get nom(){
   return this.myForm.get('nom') ;
 }

 get prenom(){
   return this.myForm.get('prenom') ;
 }



 get email(){
   return this.myForm.get('email') ;
 }

 get adress(){
  return this.myForm.get('adress') ;
}


get tel(){
  return this.myForm.get('tel') ;
}

   onClose() {
     this.dialogClose.closeAll();
   }

 }

