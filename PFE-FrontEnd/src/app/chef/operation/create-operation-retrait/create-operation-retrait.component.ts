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
import { AuthService } from 'src/app/Services/auth.service';
import { ethers } from 'ethers';
import { OperationTank } from 'src/app/Models/operationTank';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { environment } from 'src/environments/environment';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RetraitCol.json');
@Component({
  selector: 'app-create-operation-retrait',
  templateUrl: './create-operation-retrait.component.html',
  styleUrls: ['./create-operation-retrait.component.css'],
  providers: [DatePipe],
})
export class CreateOperationRetraitComponent implements OnInit {
  operation: Operation = new Operation();
  t: Tank = new Tank();
  submitted = false;
  msg = '';
  tab!: any[];
  tabTankId!: any[];
  qteRsetLait = 0;
  msgErreur = 0;
  qteActLaitTank = 0;
  qteMax = 0;
  som = 0;
  msg4 = 0;
  myForm = new FormGroup({
    poidsLait: new FormControl(null, [Validators.required, Validators.min(1)]),
    usine: new FormControl(null, [Validators.required]),
    cgu: new FormControl(false, Validators.requiredTrue),
  });
  tanks!: Observable<Tank[]>;
  usines!: Observable<Usine[]>;

  maDate = new Date();
  connected!: boolean;
  text = '';

  exportOne(op: Operation, confirmation: string) {
    const doc = new jsPDF();
    var imageData = environment.img;
    const n = op.code.toString() + '.pdf';
    doc.addImage(imageData, 'JPEG', 0, 0, 210, 297);
    this.text = op.chef.nom.toString() + ' ' + op.chef.prenom.toString();
    doc.text(op.dateOperation.toString(), 120, 123.5);
    doc.text(op.code.toString(), 92, 54);
    doc.text(this.text, 75, 107.2);

    doc.setFontSize(12);
    doc.text(op.usine.nomUsine.toString(), 65, 139);

    doc.save(n);
  }

  constructor(
    private translateService: TranslateService,
    private operationService: OperationService,
    private tankService: TankService,
    private router: Router,
    private location: Location,
    private usineService: UsineService,
    private authService: AuthService,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  OpTankRetraitCentreTab01!: number[];
  async reloadDataRetraitCentre01() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const depKEY = Object.keys(Remplissage.networks)[0];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        const contract = new ethers.Contract(
          Remplissage.networks[depKEY].address,
          Remplissage.abi,
          signer
        );
        this.OpTankRetraitCentreTab01 = await contract.getOperationNumbers();

        this.jj = this.OpTankRetraitCentreTab01.length;
        this.connected = true;
      } catch (error) {
        this.connected = false;
      }
    }
  }

  jj!: number;
  async ngOnInit() {
    await this.reloadDataRetraitCentre01();
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }

    this.tanks = this.tankService.getTanksFiltres();
    this.usines = this.usineService.getUsines();
    this.operationService.getNbOp().subscribe((o) => {
      console.log(o);
      if (this.connected == true) {
        this.som = 100000000 + this.jj + 1;
      } else {
        this.som = 100000000 + o + 1;
      }
    });

    console.log(this.maDate);
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {
    environment.wating = 'startwaiting';
    this.onReload();
    if (
      this.myForm.get('poidsLait')?.value == null ||
      this.myForm.get('usine')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (
      this.myForm.get('poidsLait')?.value != null &&
      this.myForm.get('usine')?.value != null &&
      this.myForm.get('cgu')?.value == true &&
      this.myForm.get('poidsLait')?.value >= 1
    ) {
      this.operationService
        .createOperation({
          poidsLait: this.myForm.get('poidsLait')?.value,
          usine: {
            idUsine: this.myForm.get('usine')?.value,
          },
          code: this.som,
        })
        .subscribe(
          (o) => {
            this.tab = Object.values(o);

            this.operationService.getOpTank(this.tab[0]).subscribe(async (i) => {
              this.tabTankId = Object.values(i);
              await this.saveInBc(this.tabTankId, this.tabTankId.length);
              if (environment.wating == 'rejected') {
                localStorage.setItem(
                  'Toast',
                  JSON.stringify(['Failed', "L'op??ration a ??t?? rejet??e"])
                );
              } else {
                localStorage.setItem(
                  'Toast',
                  JSON.stringify([
                    'Success',
                    'Une operation a ??t?? ajout??e avec succ??s',
                  ])
                );
              }
            });
          },
          (error) => {
            console.log('Failed');
          }
        );
    }
    this.tankService.getTanksQteLibre().subscribe((o) => {
      console.log(o);
      if (this.myForm.get('poidsLait')?.value <= o) this.msgErreur = 0;
      else {
        this.msgErreur = 1;
        this.qteRsetLait = o;
      }
    });
  }

  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }
  confirmation: string = 'confirmed';

  async saveInBc(elem0: OperationTank[], count: number) {
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
      const transaction = await contract.RetraitOperationTank(elem0, count);
      await transaction.wait();
      environment.wating = 'confirmed';
    } catch (error) {
      this.confirmation = 'rejected';
      console.log('rejected');
    }
    if (this.confirmation == 'confirmed') {
      environment.wating = 'confirmed';
      this.exportOne(elem0[0].operation, this.confirmation);
    }
    if (this.confirmation == 'rejected') {
      environment.wating = 'rejected';
      this.operationService
        .deleteOperation(elem0[0].operation.idOperation)
        .subscribe((d) => {
          this.onReload();
        });
    }
    this.onReload();
  }

  onSubmit() {
    if (this.myForm.get('poidsLait')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('usine')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('cgu')?.value == true) {
      this.msg4 = 0;
    } else {
      this.msg4 = 1;
    }

    this.tankService.getQteTanks().subscribe((a) => {
      this.tankService.getQteG().subscribe((o) => {
        console.log(o);
        if (
          this.myForm.get('poidsLait')?.value != null &&
          this.myForm.get('usine')?.value != null &&
          this.myForm.get('cgu')?.value == true &&
          this.myForm.get('poidsLait')?.value > 0
        ) {
          if (this.myForm.get('poidsLait')?.value <= o) {
            this.save();
            this.onClose();
            this.msgErreur = 0;
          } else {
            this.msgErreur = 1;
            this.qteActLaitTank = o;
            this.qteMax = a;
          }
        }
      });
    });
  }

  gotoList() {
    this.router.navigate(['chef/operation/listeOperationRetrait']);
  }

  onReload() {
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
    this.onReload();
  }

  get poidsLait() {
    return this.myForm.get('poidsLait');
  }

  get usine() {
    return this.myForm.get('usine');
  }
}
