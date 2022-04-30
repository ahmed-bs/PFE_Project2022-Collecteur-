import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import { Usine } from 'src/app/Models/usine';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { UsineService } from 'src/app/Services/usine.service';
import { DatePipe } from '@angular/common';

import { ethers } from 'ethers';
import { OperationTank } from 'src/app/Models/operationTank';
import { Chef } from 'src/app/Models/chef';
import { Location } from "@angular/common";

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RetraitCol.json');
@Component({
  selector: 'app-create-operation-retrait',
  templateUrl: './create-operation-retrait.component.html',
  styleUrls: ['./create-operation-retrait.component.css'],
  providers: [DatePipe]
})
export class CreateOperationRetraitComponent implements OnInit {

  operation: Operation = new Operation();
  t: Tank = new Tank();
  submitted = false;
  msg = "";
  tab!: any[];
  tabTankId!: any[];
  qteRsetLait = 0;
  msgErreur = 0;
  qteActLaitTank = 0;
  qteMax = 0;
  som = 0;
  myForm = new FormGroup({
    poidsLait: new FormControl(null, [Validators.required, Validators.min(1)]),
    usine: new FormControl(null, [Validators.required]),

  })
  tanks!: Observable<Tank[]>;
  usines!: Observable<Usine[]>;

  maDate = new Date();


  constructor(
    private operationService: OperationService,
    private tankService: TankService,
    private router: Router,
    private location: Location,
    private usineService: UsineService,
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.tanks = this.tankService.getTanksFiltres();
    this.usines = this.usineService.getUsines();
    this.operationService.getNbOp().subscribe(o => {
      console.log(o);
      this.som = 10000 + o + 1;
    });

    console.log(this.maDate);
    // var transformDate = DatePipe.transform(this.maDate, 'yyyy-MM-dd');

  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {

    if (this.myForm.get('poidsLait')?.value == null || this.myForm.get('usine')?.value == null) {
      this.msg = "vous devez remplir le formulaire !!";
    }
    else {
      this.msg = "";
    }

    if (this.myForm.get('poidsLait')?.value != null && this.myForm.get('usine')?.value != null && this.myForm.get('poidsLait')?.value >= 1) {
      this.operationService.createOperation({
        "poidsLait": this.myForm.get('poidsLait')?.value,
        "usine": {
          "idUsine": this.myForm.get('usine')?.value,
        },
        "code": this.som,
      })
        .subscribe(o => {
          this.tab = Object.values(o)
          localStorage.setItem('Toast', JSON.stringify(["Success", "Une operation a été ajouté avec succès"]));
          this.usineService.getUsine(this.myForm.get('usine')?.value).subscribe(
            b => {
              console.log(b)
              localStorage.setItem('usine', JSON.stringify(b))
            });
          this.operationService.getOpTank(this.tab[0]).subscribe(i => {
            this.tabTankId = Object.values(i)
            localStorage.setItem('tabTankId', JSON.stringify(this.tabTankId))
          });
          this.onReload();
        },
          (error) => {
            console.log("Failed")
          });
          this.onReload();
      //  ****************   Tank    ******************
      //     let bb=this.tankService.getTank(this.myForm.get('tank')?.value).subscribe(o=>{
      //       this.t=o;
      //       console.log(o);
      //       console.log(this.t);
      //       console.log(o.poidActuel);
      // if(o.poidActuel<this.myForm.get('poidsLait')?.value){
      // this.msgErreur=1;
      // this.qteActLaitTank=o.poidActuel;
      //     }
      // else
      // this.msgErreur=0;
      //     });
      // if(this.qteActLaitTank>=this.myForm.get('poidsLait')?.value){

    }
    this.tankService.getTanksQteLibre().subscribe(
      o => {
        console.log(o);
        if (this.myForm.get('poidsLait')?.value <= o)
          this.msgErreur = 0;
        else {
          this.msgErreur = 1;
          this.qteRsetLait = o;
        }
      });
      this.onReload();
  }


  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }

  usine0: Usine = new Usine();
  count!: number;
  elem0: OperationTank[] = [];
  async saveInBc() {
    const depKEY = Object.keys(Remplissage.networks)[0];
    await this.requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)
    this.elem0 = JSON.parse(localStorage.getItem('tabTankId') || '[]') || [];
    this.count = this.elem0.length
    for (var i = 0; i < this.count; i++) {
      this.elem0[i].operation.usine = JSON.parse(localStorage.getItem('usine') || '[]') || [];

    }
    const transaction = await contract.RetraitOperationTank(this.elem0, this.count);
    await transaction.wait();
    this.onClose();
  }






  onSubmit() {
    this.tankService.getQteTanks().subscribe(
      a => {
        this.tankService.getQteG().subscribe(
          o => {
            console.log(o);
            if (this.myForm.get('poidsLait')?.value <= o) {
              this.save();
              this.msgErreur = 0;
              this.saveInBc();
            }
            else {
              this.msgErreur = 1;
              this.qteActLaitTank = o;
              this.qteMax = a;
            }
          });
      });
  }

  gotoList() {
    this.router.navigate(['chef/operation/listeOperationRetrait']);
  }


  onReload() {
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/bon/listeCollecteur", { skipLocationChange: true }).then(response => {
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }


  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }

  get poidsLait() {
    return this.myForm.get('poidsLait');
  }


  get usine() {
    return this.myForm.get('usine');
  }

}

