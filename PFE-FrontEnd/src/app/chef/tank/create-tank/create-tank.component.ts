import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tank } from 'src/app/Models/tank';
import {Location} from "@angular/common";
import { TankService } from 'src/app/Services/tank.service';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-tank',
  templateUrl: './create-tank.component.html',
  styleUrls: ['./create-tank.component.css']
})
export class CreateTankComponent implements OnInit {

  tank:Tank = new Tank();
  submitted = false;
  msg="";
  msg1=0;
  msgErreur=0;
  qteAct=0;
  msg4=0;

  myForm=new  FormGroup({
    matricule : new FormControl(null,[Validators.required,Validators.minLength(8)]),
    poidVide : new FormControl(null,[Validators.required,Validators.min(100)]),
    cgu: new FormControl(false, Validators.requiredTrue),
  })
  // produits!:Observable<Produit[]>;
  // Tanks!:Observable<Tank[]>;
  // fournisseurs!:Observable<Fournisseur[]>;

  constructor(  
     private translateService :TranslateService,
     private tankService: TankService,
     private router: Router,
     private authService:AuthService,
     private location:Location,
     private dialogClose: MatDialog,) { 
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
     }

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }

  }

  newTank(): void {
    this.submitted = false;
    this.tank = new Tank();
  }

  save() {

    if(this.myForm.get('matricule')?.value==null || this.myForm.get('poidVide')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }
  
     this.tankService.getTankMatriculeUtilise(this.myForm.get('matricule')?.value).subscribe(t=>{
      console.log(t);
      if(t==1){
        this.msg1=1;
       }
       else{
        this.msg1=0;
       }
       
  
  
    if(this.myForm.get('poidVide')?.value!=null && this.myForm.get('matricule')?.value!=null &&    this.myForm.get('cgu')?.value==true
    && this.myForm.get('poidVide')?.value>=100  && this.myForm.get('matricule')?.value.length>=8 && t==0){

    this.tankService
        .createTank({
          "matricule":this.myForm.get('matricule')?.value,
          "poidVide":this.myForm.get('poidVide')?.value,
          // "poidActuel":this.myForm.get('poidActuel')?.value,
          // "etat":this.myForm.get('etat')?.value,
        })
        .subscribe(o=>{
          // window.location.reload();
          console.log(this.tank);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un Tank a été ajouté avec succès"]));
          // window.location.reload();
          this.onClose();
        });
      }
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
    this.router.navigate(['chef/tank/listeTank']);
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

 get matricule(){
  return this.myForm.get('matricule') ;
}

get poidVide(){
  return this.myForm.get('poidVide') ;
}

get poidActuel(){
  return this.myForm.get('poidActuel') ;
}

// get etat(){
//   return this.myForm.get('etat') ;
// }


}
