import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationComponent } from '../details-operation/details-operation.component';
import { UpdateOperationComponent } from '../update-operation/update-operation.component';
import { ethers } from 'ethers';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { OperationTank } from 'src/app/Models/operationTank';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RemplissageCol.json');
@Component({
  selector: 'app-liste-operation',
  templateUrl: './liste-operation.component.html',
  styleUrls: ['./liste-operation.component.css'],
})
export class ListeOperationComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!: MatSort;
  connected!: string;
  intervalId?: any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  waiting = environment.wating;
  ELEMENT_DATA?: Operation[];
  operation?: Operation;
  dataSource!: MatTableDataSource<any>;
  v = 0;
  erreur = 0;
  err = '';
  p = 0;
  q = 0;

  test1 = 0;
  test2 = 0;
  lang = '';

  displayedColumns: string[] = [
    'idOperation',
    'poidsLait',
    'dateOperation',
    'agriculteur',
    'code',
    'action',
  ];
  constructor(
    private translateService: TranslateService,
    private operationService: OperationService,
    private tankService: TankService,
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  operations!: Observable<OperationTank[]>;
  reloadData00() {
    const depKEY = Object.keys(Remplissage.networks)[0];
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        Remplissage.networks[depKEY].address,
        Remplissage.abi,
        signer
      );
      this.operations = contract.getOperationTanks();
    }
    console.log('**************************4471441714144');
    console.log(this.operations);
  }

  ngOnInit() {
    console.log(localStorage.getItem('lang') || 'en');
    this.lang = localStorage.getItem('lang') || 'en';

    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }

    this.reloadData();
    console.log(this.tankService.getTanksQteLibre());

    this.idContenu = 'TostSuccessContenu';
    this.idTitle = 'TostSuccessTile';

    this.Toast = JSON.parse(localStorage.getItem('Toast') || '[]') || [];
    if (this.Toast[0] == 'Success') {
      console.log('Toast est n est pas vide');
      this.showToast();
    } else if (this.Toast[0] == 'Failed') {
      console.log('Toast est n est pas vide');
      this.idContenu = 'TostDangerContenu';
      this.idTitle = 'TostDangerTile';
      this.showToast();
    } else {
      console.log('Toast Vide');
    }
  }

  reloadData() {
    this.operationService.getOperationsRemplissages().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteOperation(id: number) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    let confirmation = confirm(
      "??tes-vous s??r de supprimer l'operation o?? son id est egale ?? : " +
        id +
        ' ??'
    );
    if (confirmation)
      this.operationService.deleteOperation(id).subscribe(
        () => {
          this.Toast[0] = 'Success';
          this.Toast[1] = 'Une op??ration a ??t?? supprim??e avec succ??s';
          localStorage.setItem('Toast', JSON.stringify(this.Toast));
          this.onClose();
        },
        (error) => {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] = '??chec de la suppression !!';
          this.showToast();
        }
      );
  }

  deleteOp(id: number) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    this.tankService.getTanksQteGenerale().subscribe((o) => {
      console.log(o);
      this.q = o;
      this.operationService.getOperation(id).subscribe((a) => {
        console.log(a.poidsLait);
        console.log(id);
        this.p = a.poidsLait;

        this.operationService.getNbOpTankTotal(id).subscribe((b) => {
          console.log(b);
          this.test1 = b;

          this.operationService.getNbOpTank(id).subscribe((c) => {
            console.log(c);
            this.test2 = c;

            if (this.p <= this.q && this.test1 == this.test2) {
              this.deleteOperation(id);
            } else {
              this.idContenu = 'TostDangerContenu';
              this.idTitle = 'TostDangerTile';
              this.Toast[0] = 'Failed';
              this.Toast[1] =
                'Vous avez d??ja utilis?? la quantit?? de laits inser??e dans les tanks affect??es a cette op??ration !!';
              this.showToast();
            }
          });
        });
      });
    });
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
    this.dialog.closeAll();
    this.onReload();
  }

  detailsOperation(operation: Operation) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
    this.dialog.open(DetailsOperationComponent, dialogConfig);
  }

  updateOperation(operation: Operation) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
    this.dialog.open(UpdateOperationComponent, dialogConfig);
  }

  onOpenDialogCreate(): void {
    this.connected = JSON.parse(localStorage.getItem('state') || '[]') || [];
    console.log(this.connected);
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    this.tankService.getQteLibreAujourdhui().subscribe((o) => {
      console.log(o);
      if (o > 0 && this.connected == 'connected') {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateOperationComponent, dialogConfig);
        this.erreur = 0;
      } else if (o <= 0) {
        this.erreur = 1;
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] = 'Les tanks sont totalment remplis !!';
        this.showToast();
      } else if (this.connected == 'notconnected') {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] =
          "Vous n'??tes pas connect?? !! \n vous devez d'abord vous connecter ?? metamask !!";
        this.showToast();
      }
    });
  }

  onOpenDialogCreate2(): void {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateOperationComponent, dialogConfig);
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  showToast() {
    if (this.ShowToast == 'hide') {
      setTimeout(() => {
        this.ShowToast = 'show';
        console.log(this.ShowToast);
      }, 1);
    }

    setTimeout(() => {
      this.ShowToast = 'hide';
      this.Toast = [];
      localStorage.setItem('Toast', JSON.stringify(this.Toast));
      console.log(this.ShowToast);
    }, 12100);
    this.intervalId = setInterval(() => {
      this.counter = this.counter + 1;
      if (this.counter === 15) clearInterval(this.intervalId);
    }, 1000);
    this.counter = 0;
  }
}
