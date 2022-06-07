import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { Operation } from 'src/app/Models/operation';
import { OperationTank } from 'src/app/Models/operationTank';
import { Tank } from 'src/app/Models/tank';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { Location } from '@angular/common';
import { ethers } from 'ethers';
import { Chef } from 'src/app/Models/chef';
import { Usine } from 'src/app/Models/usine';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ChefService } from 'src/app/Services/chef.service';


declare let require: any;
declare let window: any;
let RetraitFarmerAdresse = require('/build/contracts/RemplissageAgric.json');
let Remplissage = require('../../../../../build/contracts/RemplissageCol.json');
@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css'],
})
export class CreateOperationComponent implements OnInit {
  operation: Operation = new Operation();
  submitted = false;
  msg = '';
  msg1 = 0;
  msg5 = 10;
  msg6 = 10;
  msg7 = 10;
  t: Tank = new Tank();
  msgErreur = 0;
  msgErreur2 = 0;
  // qte de lait restante pour chaque vache
  qteRsetLait = 0;
  //qte restante de lait pour un tank
  qteRsetLaitTank = 0;
  valeur1 = 0;
  valeur2 = 0;
  connected!: boolean;
  msg4 = 0;
  myForm = new FormGroup({
    poidsLait: new FormControl(null, [Validators.required, Validators.min(1)]),
    code: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    agriculteur: new FormControl(null, [Validators.required]),
    cgu: new FormControl(false, Validators.requiredTrue),
  });

  tanks!: Observable<Tank[]>;
  agriculteurs!: Observable<Agriculteur[]>;

  length = 0;

  ELEMENT_DATA!: OperationTank[];

  tab!: any[];
  tabTankId!: any[];
  msg2 = '';
  constructor(private translateService: TranslateService,
    private operationService: OperationService,
    private tankService: TankService,
    private chefService: ChefService,
    private agriculteurService: AgriculteurService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private dialogClose: MatDialog,
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
  }

  async ngOnInit() {
    await this.reloadDataRemplissageCentre01();
    console.log("this.operationsRemplissageCol1");
    console.log(this.operationsRemplissageCol1);
    this.authService.loadToken();
    if (this.authService.getToken() == null ||
      this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);

    }

    //this.ValidatedForm();
    this.tanks = this.tankService.getTanks();
    this.agriculteurs = this.agriculteurService.getAgriculteurs();
  }

  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }


  operationsRemplissageCol1!: OperationTank[];
  async reloadDataRemplissageCentre01() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const depKEY = Object.keys(Remplissage.networks)[0];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer);
        this.operationsRemplissageCol1 = await contract.getOperationTanks();
        this.connected = true;
      } catch (error) {
        this.connected = false;
      }

    }
    console.log('**************************4471441714144');
    console.log(this.operationsRemplissageCol1);
  }
  operationsfarmerResult !: Operation;
  codeCompar !: number
  async FindByCodefarmer(codeCompar: any) {
    const depKEY = Object.keys(RetraitFarmerAdresse.networks)[0];
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      this.codeCompar = parseInt(codeCompar);
      const contract = new ethers.Contract(
        RetraitFarmerAdresse.networks[depKEY].address,
        RetraitFarmerAdresse.abi,
        signer
      );
      return this.operationsfarmerResult = await contract.GetOperationFarmerByCode(
        this.codeCompar
      );
    }
  }





  async save() {
    environment.wating = 'startwaiting';
    this.onReload();

    if (
      this.myForm.get('poidsLait')?.value == null ||
      this.myForm.get('agriculteur')?.value == null ||
      this.myForm.get('code')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }


    this.operationService.getOpCodeUtilise(this.myForm.get('code')?.value).subscribe((t) => {
      console.log(t);
      if (t == 1) {
        this.msg1 = 1;
      } else {
        this.msg1 = 0;
      }

      if (
        this.myForm.get('poidsLait')?.value != null &&
        this.myForm.get('agriculteur')?.value != null &&
        this.myForm.get('code')?.value != null &&
        this.myForm.get('poidsLait')?.value >= 1 &&
        this.myForm.get('cgu')?.value == true &&
        t == 0 &&
        this.myForm.get('code')?.value.toString().length >= 5 &&
        this.msg == ''
      ) {
        this.operationService.createOperationRemplissage({
          poidsLait: this.myForm.get('poidsLait')?.value,
          code: this.myForm.get('code')?.value,
          agriculteur: {
            idAgriculteur: this.myForm.get('agriculteur')?.value,
          },
        }).subscribe(async (o) => {
          this.tab = Object.values(o);
          this.operationService.getOpTank(this.tab[0]).subscribe(async (i) => {
            this.tabTankId = Object.values(i);
            await this.saveInBc(this.tabTankId, this.tabTankId.length)
            if (this.confirmation == 'rejected') {
              localStorage.setItem(
                'Toast',
                JSON.stringify([
                  'Failed',
                  "L'opération a été rejetée",
                ])
              );

            } else {
              localStorage.setItem(
                'Toast',
                JSON.stringify([
                  'Success',
                  'Une operation a été ajoutée avec succès',
                ])
              );
            }
          });
        },
          (error) => {
            console.log('Failed');
          });
        this.tankService.getTanksQteLibre().subscribe((o) => {
          if (this.myForm.get('poidsLait')?.value <= o) this.msgErreur = 0;
          else {
            this.msgErreur = 1;
            this.qteRsetLait = o;
          }
        });
      }
    });
  }

  confirmation: string = 'confirmed';

  async saveInBc(elem0: OperationTank[], count: number) {
    this.onReload();

    const depKEY = Object.keys(Remplissage.networks)[0];
    await this.requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Remplissage.networks[depKEY].address,
      Remplissage.abi,
      signer
    );
    try {
      const transaction = await contract.addOperationTank(elem0, count);
      await transaction.wait();
      environment.wating = 'confirmed';
    } catch (error: any) {
      this.confirmation = 'rejected';
      console.log('rejected');
    };
    if (this.confirmation == 'confirmed') {
      environment.wating = 'confirmed';
    }
    if (this.confirmation == 'rejected') {
      environment.wating = 'rejected';
      this.operationService
        .deleteOperation(elem0[0].operation.idOperation).subscribe(d => { this.onReload(); });
    }
    this.onReload()
  }



  // verifBc(){
  //   this.operationService.getOpCodeUtilise(this.myForm.get('code')?.value).subscribe((t) => {
  //     console.log(t);
  //     if (t == 1) {
  //       this.msg1 = 1;
  //     } else {
  //       this.msg1 = 0;
  //     }

  //     if (
  //       this.myForm.get('poidsLait')?.value != null &&
  //       this.myForm.get('agriculteur')?.value != null &&
  //       this.myForm.get('code')?.value != null &&
  //       this.myForm.get('poidsLait')?.value >= 1 &&
  //       this.myForm.get('cgu')?.value==true &&
  //       t == 0 &&
  //       this.myForm.get('code')?.value.toString().length >= 5
  //     ) {
  //       this.saveInBc();
  //     }

  //   });
  // }
  kk: number = 0;
  async onSubmit() {
    //this.submitted = true;
    try {
      await this.FindByCodefarmer(this.myForm.get('code')?.value)
      this.chefService.getUser(12).subscribe((t) => {
        console.log(this.operationsfarmerResult.collecteur.nomCollecteur)
      
        console.log(this.myForm.get('poidsLait')?.value)


        if (Math.abs(Number(this.operationsfarmerResult.poidsLait) )== this.myForm.get('poidsLait')?.value) {
          this.msg7 = 1
          console.log("founded poids lait")
        }else{
          console.log("notfount the poids lait not the same")
          this.msg7 = 0
        }



        this.agriculteurService.getAgriculteur(this.myForm.get('agriculteur')?.value).subscribe(
          (f) => {
            if (this.operationsfarmerResult.agriculteur.nom.trim() == f.nom.trim() && this.operationsfarmerResult.agriculteur.prenom.trim() == f.prenom.trim()) {
              this.msg6 = 1
              console.log("founded agriculteur")
            }else{
              this.msg6 = 0
              console.log("notfount agriculteur")
            }
          }
        )

        if (this.operationsfarmerResult.collecteur.nomCollecteur.trim() == t.centreNom.trim()) {
          this.msg5 = 1
          console.log("founded collecteur")
        }else{
          console.log("notfount the name collecteur not the same")
          this.msg5 = 0
        }

      })

    } catch (error) {
      this.msg5 = 0
      console.log("notfount the code")
    }

    try {
      for (let index = 0; index <= this.kk; index++) {
        if (this.myForm.get('code')?.value == this.operationsRemplissageCol1[index].operation.code) {
          this.msg2 = 'code deja exist';
        } else {
          this.msg2 = 'ok';
        }
      }
    } catch (error) {
      this.msg2 = 'ok';
    }

    if (this.myForm.get('poidsLait')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('agriculteur')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('code')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }
    if (this.myForm.get('cgu')?.value == true) {
      this.msg4 = 0;
    }
    else {
      this.msg4 = 1;
    }
    this.tankService.getTanksQteLibre().subscribe((o) => {
      if (this.myForm.get('poidsLait')?.value <= o) {
        this.msgErreur = 0;
      }
      else {
        this.msgErreur = 1;
        this.qteRsetLait = o;
      }
    });


    this.operationService.getOpCodeUtilise(this.myForm.get('code')?.value).subscribe((t) => {
      console.log(t);
      if (t == 1) {
        this.msg1 = 1;
      } else {
        this.msg1 = 0;
      }

      this.tankService.getTanksQteLibre().subscribe((o) => {
        console.log(o);
        if (
          this.msg6 == 1 &&
          this.msg5 == 1 &&
          this.msg7 == 1 &&
          this.myForm.get('poidsLait')?.value != null &&
          this.myForm.get('agriculteur')?.value != null &&
          this.myForm.get('poidsLait')?.value > 0 &&
          this.myForm.get('cgu')?.value == true &&
          t == 0 &&
          this.msg2 == 'ok' &&
          this.myForm.get('code')?.value != null
        ) {
          if (this.myForm.get('poidsLait')?.value <= o) {


            this.save();
            this.msgErreur = 0;
            this.onClose();

          }
          else {
            this.msgErreur = 1;
            this.qteRsetLait = o;
          }
        }

      });
    });
  }

  gotoList() {
    this.router.navigate(['chef/operation/listeOperation']);
  }

  onReload() {
    // this.router.navigate([this.router.url]);
    this.router
      .navigateByUrl("/'agriculteur/bon/listeCollecteur", {
        skipLocationChange: true,
      })
      .then((response) => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }

  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }

  get poidsLait() {
    return this.myForm.get('poidsLait');
  }

  get agriculteur() {
    return this.myForm.get('agriculteur');
  }

  get code() {
    return this.myForm.get('code');
  }

  get tank() {
    return this.myForm.get('tank');
  }
}
