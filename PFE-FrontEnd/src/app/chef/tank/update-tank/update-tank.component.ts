import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Services/tank.service';

@Component({
  selector: 'app-update-tank',
  templateUrl: './update-tank.component.html',
  styleUrls: ['./update-tank.component.css']
})
export class UpdateTankComponent implements OnInit {
  tank:Tank=new Tank();
  // myForm!:FormGroup;
   CheckesCompetance:boolean=false;

   myForm=new  FormGroup({
     matricule : new FormControl(null,[Validators.required]),
     poidVide : new FormControl(null,[Validators.required ]),
    //  poidActuel : new FormControl(null,[Validators.required ]),
    //  etat : new FormControl(null,[Validators.required ]),
 })


   constructor(
     private dialogClose: MatDialog,
     private tankService:TankService,

   ) { }

   ngOnInit(): void {
     //this.ValidatedForm();
     this.tankService.getTank(JSON.parse(localStorage.getItem('IdTank') || '[]') || []).subscribe(o =>{
       this.tank = o;
       console.log(this.tank);
     });

   }

   updateTank(){

     this.tankService
     // .updateTank(this.Tank.idTank,this.Tank)
         .updateTank(this.tank.idTank,{
           "matricule":this.myForm.get('matricule')?.value,
           "poidVide":this.myForm.get('poidVide')?.value,
          //  "poidActuel":this.myForm.get('poidActuel')?.value,
          //  "etat":this.myForm.get('etat')?.value,

         })
         .subscribe(o=>{
           localStorage.setItem('Toast', JSON.stringify(["Success","Un Tank a été modifié avec succes"]));
           window.location.reload();
           console.log(this.tank);
         },
         (error) => {
           console.log("Failed")
         }
       );
   }

  get matricule(){
   return this.myForm.get('matricule') ;
 }

 get poidVide(){
   return this.myForm.get('poidVide') ;
 }



//  get poidActuel(){
//    return this.myForm.get('poidActuel') ;
//  }

//  get etat(){
//   return this.myForm.get('etat') ;
// }

   onClose() {
     this.dialogClose.closeAll();
   }

 }

