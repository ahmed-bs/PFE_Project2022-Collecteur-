import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import {Location} from "@angular/common";

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
  msg1=0;
  msg2=0;
  msg3=0;
  msg4=0;

  myForm=new  FormGroup({
      nom : new FormControl(null,[Validators.required ,Validators.minLength(3)]),
      prenom : new FormControl(null,[Validators.required ,Validators.minLength(3)]),
      matricule : new FormControl(null,[Validators.required,Validators.minLength(8)]),
      adress : new FormControl(null,[Validators.required,Validators.minLength(4) ]),
      tel : new FormControl(null,[Validators.required,Validators.pattern("[0-9 ]{8}") ]),
      cgu: new FormControl(false, Validators.requiredTrue),
    
  })
  // produits!:Observable<Produit[]>;
  // agriculteurs!:Observable<Agriculteur[]>;
  // fournisseurs!:Observable<Fournisseur[]>;

  constructor(
     private agriculteurService: AgriculteurService,
     private router: Router, 
     private location:Location,
     private dialogClose: MatDialog,) { }

  ngOnInit() {

  }

  newAgriculteur(): void {
    this.submitted = false;
    this.agriculteur = new Agriculteur();
  }

  save() {

    if(this.myForm.get('nom')?.value==null || this.myForm.get('tel')?.value==null || this.myForm.get('prenom')?.value==null ||
   this.myForm.get('adress')?.value==null ||   this.myForm.get('matricule')?.value==null  ){
    this.msg="veuillez remplir tous les champs obligatoires (*) !!";
   }
   else{
    this.msg="";
   }

    this.agriculteurService.getNomPrenomUtilse(this.myForm.get('nom')?.value,this.myForm.get('prenom')?.value).subscribe(t=>{
      console.log(t);
      if(t==1){
        this.msg1=1;
       }
       else{
        this.msg1=0;
       }
       this.agriculteurService.getTelUtilse(this.myForm.get('tel')?.value).subscribe(b=>{
        console.log(b);
        if(b==1){
          this.msg2=1;
         }
         else{
          this.msg2=0;
         }

         this.agriculteurService.getMatriculeUtilse(this.myForm.get('matricule')?.value).subscribe(m=>{
          console.log(m);
          if(m==1){
            this.msg3=1;
           }
           else{
            this.msg3=0;
           }
 
   if(this.myForm.get('nom')?.value!=null && this.myForm.get('prenom')?.value!=null && t==0 && b==0 && m==0 &&
      this.myForm.get('adress')?.value!=null && this.myForm.get('tel')?.value!=null &&  this.myForm.get('cgu')?.value==true &&
      this.myForm.get('tel')?.value.toString().length==8 && this.myForm.get('nom')?.value.length>=3 && 
      this.myForm.get('prenom')?.value.length>=3  && this.myForm.get('adress')?.value.length>=4 &&
      this.myForm.get('matricule')?.value!=null && this.myForm.get('matricule')?.value.length>=8  ){
    this.agriculteurService
        .createAgriculteur({
          "nom":this.myForm.get('nom')?.value,
          "prenom":this.myForm.get('prenom')?.value,
          "matricule":this.myForm.get('matricule')?.value,
          "adress":this.myForm.get('adress')?.value,
          "tel":this.myForm.get('tel')?.value,
        })
        .subscribe(o=>{
          // window.location.reload();
          console.log(this.agriculteur);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un agriculteur a été ajouté avec succès"]));
          this.onClose();     
        });
    }
  });
});
});
  }
  

  onSubmit() {
    if(this.myForm.get('cgu')?.value==true){
      this.msg4=0;
    }
    else{
      this.msg4=1;
    }

        this.save();
  }

  gotoList() {
    this.router.navigate(['chef/agriculteur/listeAgriculteur']);
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


 get nom(){
  return this.myForm.get('nom') ;
}

get prenom(){
  return this.myForm.get('prenom') ;
}

get matricule(){
  return this.myForm.get('matricule') ;
}

get adress(){
  return this.myForm.get('adress') ;
}

get tel(){
  return this.myForm.get('tel') ;
}


}

