import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Usine } from 'src/app/Models/usine';
import { UsineService } from 'src/app/Services/usine.service';
import { Router } from '@angular/router';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
    tel : new FormControl(null,[Validators.required,Validators.pattern("[0-9 ]{8}") ]),
})


   constructor(
    private translateService :TranslateService,
     private dialogClose: MatDialog,
     private usineService:UsineService,
     private authService:AuthService,
     private location:Location,
     private router: Router, 


   ) { 
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
   }

   ngOnInit(): void {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }
    
     //this.ValidatedForm();
     this.usineService.getUsine(JSON.parse(localStorage.getItem('IdUsine') || '[]') || []).subscribe(o =>{
       this.usine = o;
       console.log(this.usine);
     });

   }

   updateUsine(){
    if(this.myForm.get('nomUsine')?.value==null || this.myForm.get('adresse')?.value==null ||this.myForm.get('tel')?.value==null ){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }
    
     if( this.myForm.get('adresse')?.value!=null && this.myForm.get('nomUsine')?.value!=null && 
         this.myForm.get('adresse')?.value.length>=4 && this.myForm.get('nomUsine')?.value.length>=3 &&
         this.myForm.get('tel')?.value!=null && this.myForm.get('tel')?.value.toString().length==8 ){

     this.usineService
     // .updateusine(this.usine.idusine,this.usine)
         .updateUsine(this.usine.idUsine,{
           "nomUsine":this.myForm.get('nomUsine')?.value,
           "adresse":this.myForm.get('adresse')?.value,
           "tel":this.myForm.get('tel')?.value,
         })
         .subscribe(o=>{
           localStorage.setItem('Toast', JSON.stringify(["Success","Une usine a été modifié avec succes"]));
          //  window.location.reload();
           console.log(this.usine);
           this.onClose();
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

get tel(){
  return this.myForm.get('tel') ;
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

