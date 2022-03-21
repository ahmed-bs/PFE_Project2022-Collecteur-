import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';

@Component({
  selector: 'app-create-agriculteur',
  templateUrl: './create-agriculteur.component.html',
  styleUrls: ['./create-agriculteur.component.css']
})
export class CreateAgriculteurComponent implements OnInit {

  agriculteur:Agriculteur = new Agriculteur();
  submitted = false;
  msg="";
  msgErreur=0;
  qteAct=0;

  myForm=new  FormGroup({
      nom : new FormControl(null,[Validators.required]),
      prenom : new FormControl(null,[Validators.required ]),
      email : new FormControl(null,[Validators.required ]),
      adress : new FormControl(null,[Validators.required ]),
      tel : new FormControl(null,[Validators.required ]),
    
  })
  // produits!:Observable<Produit[]>;
  // agriculteurs!:Observable<Agriculteur[]>;
  // fournisseurs!:Observable<Fournisseur[]>;

  constructor(
     private agriculteurService: AgriculteurService,
     private router: Router, 
     private dialogClose: MatDialog,) { }

  ngOnInit() {

  }

  newAgriculteur(): void {
    this.submitted = false;
    this.agriculteur = new Agriculteur();
  }

  save() {

   if(this.myForm.get('nom')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
   }
   else{
    this.msg="";
   }

   if(this.myForm.get('prenom')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }
  
  if(this.myForm.get('adress')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }
  

  if(this.myForm.get('email')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   if(this.myForm.get('tel')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

    this.agriculteurService
        .createAgriculteur({
          "nom":this.myForm.get('nom')?.value,
          "prenom":this.myForm.get('prenom')?.value,
          "email":this.myForm.get('email')?.value,
          "adress":this.myForm.get('adress')?.value,
          "tel":this.myForm.get('tel')?.value,
        })
        .subscribe(o=>{
          window.location.reload();
          console.log(this.agriculteur);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un agriculteur a été ajouté avec succès"]));
          window.location.reload();      
        });
    }


  onSubmit() {
        this.save();
  }

  gotoList() {
    this.router.navigate(['chef/agriculteur/listeAgriculteur']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
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


}

