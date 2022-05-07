import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usine } from 'src/app/Models/usine';
import { UsineService } from 'src/app/Services/usine.service';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Services/auth.service';

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
  msg1=0;
  msg2=0;
  msg4=0;

  myForm=new  FormGroup({
      nomUsine : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      adresse : new FormControl(null,[Validators.required,Validators.minLength(4) ]),
      tel : new FormControl(null,[Validators.required,Validators.pattern("[0-9 ]{8}") ]),
      cgu: new FormControl(false, Validators.requiredTrue),
  })


  constructor(
     private usineService: UsineService,
     private router: Router, 
     private authService:AuthService,
     private location:Location,
     private dialogClose: MatDialog,) { }

  ngOnInit() {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }
  }

  newUsine(): void {
    this.submitted = false;
    this.usine = new Usine();
  }

  save() {

   if(this.myForm.get('nomUsine')?.value==null || this.myForm.get('adresse')?.value==null || this.myForm.get('tel')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
   }
   else{
    this.msg="";
   }

   
   this.usineService.getNomUsineUtilse(this.myForm.get('nomUsine')?.value).subscribe(t=>{
    console.log(t);
    if(t==1){
      this.msg1=1;
     }
     else{
      this.msg1=0;
     }

     this.usineService.getTelUsineUtilse(this.myForm.get('tel')?.value).subscribe(t1=>{
      console.log(t);
      if(t1==1){
        this.msg2=1;
       }
       else{
        this.msg2=0;
       }
       
  
   if( this.myForm.get('adresse')?.value!=null && this.myForm.get('nomUsine')?.value!=null && t==0 && t1==0&&
       this.myForm.get('adresse')?.value.length>=4 && this.myForm.get('nomUsine')?.value.length>=3 &&
       this.myForm.get('tel')?.value!=null && this.myForm.get('tel')?.value.toString().length==8 &&
       this.myForm.get('cgu')?.value==true){

    this.usineService
        .createUsine({
          "nomUsine":this.myForm.get('nomUsine')?.value,
          "adresse":this.myForm.get('adresse')?.value,
          "tel":this.myForm.get('tel')?.value,
        })
        .subscribe(o=>{
          // window.location.reload();
          console.log(this.usine);
          localStorage.setItem('Toast', JSON.stringify(["Success","Une usine a été ajouté avec succès"]));
          this.onClose();   
        });
    }
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
    this.router.navigate(['chef/usine/listeUsine']);
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
 get nomUsine(){
  return this.myForm.get('nomUsine') ;
}

get adresse(){
  return this.myForm.get('adresse') ;
}

get tel(){
  return this.myForm.get('tel') ;
}


}

