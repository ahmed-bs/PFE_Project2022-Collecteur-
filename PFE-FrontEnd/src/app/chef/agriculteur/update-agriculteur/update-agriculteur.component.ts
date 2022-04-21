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
   msg="";

   myForm=new  FormGroup({
    nom : new FormControl(null,[Validators.required ,Validators.minLength(3)]),
    prenom : new FormControl(null,[Validators.required ,Validators.minLength(3)]),
    matricule : new FormControl(null,[Validators.required,Validators.minLength(8)]),
    adress : new FormControl(null,[Validators.required,Validators.minLength(4) ]),
    tel : new FormControl(null,[Validators.required,Validators.pattern("[0-9 ]{8}") ]),
  
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
    if(this.myForm.get('nom')?.value==null || this.myForm.get('tel')?.value==null || this.myForm.get('prenom')?.value==null ||
    this.myForm.get('adress')?.value==null || this.myForm.get('matricule')?.value==null ){
     this.msg="vous devez remplir le formulaire !!";
    }
    else{
     this.msg="";
    }

    if(this.myForm.get('nom')?.value!=null && this.myForm.get('prenom')?.value!=null &&
      this.myForm.get('adress')?.value!=null && this.myForm.get('tel')?.value!=null &&
      this.myForm.get('tel')?.value.toString().length==8 && this.myForm.get('nom')?.value.length>=3 && 
      this.myForm.get('prenom')?.value.length>=3  && this.myForm.get('adress')?.value.length>=4 && 
      this.myForm.get('matricule')?.value!=null && this.myForm.get('matricule')?.value.length>=8 ){

     this.agriculteurService
     // .updateAgriculteur(this.Agriculteur.idAgriculteur,this.Agriculteur)
         .updateAgriculteur(this.agriculteur.idAgriculteur,{
           "nom":this.myForm.get('nom')?.value,
           "prenom":this.myForm.get('prenom')?.value,
           "matricule":this.myForm.get('matricule')?.value,
           "adress":this.myForm.get('adress')?.value,
           "tel":this.myForm.get('tel')?.value,

         })
         .subscribe(o=>{
           localStorage.setItem('Toast', JSON.stringify(["Success","Un agriculteur a été modifié avec succes"]));
           window.location.reload();
           console.log(this.agriculteur);
         },
         (error) => {
           console.log("Failed")
         }
       );
   }
  }

  get nom(){
   return this.myForm.get('nom') ;
 }

 get prenom(){
   return this.myForm.get('prenom') ;
 }

 get adress(){
  return this.myForm.get('adress') ;
}


get tel(){
  return this.myForm.get('tel') ;
}


get matricule(){
  return this.myForm.get('matricule') ;
}

   onClose() {
     this.dialogClose.closeAll();
   }

 }

