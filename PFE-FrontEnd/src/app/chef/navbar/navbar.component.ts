import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ChefService } from 'src/app/Services/chef.service';
import { Chef } from 'src/app/Models/chef';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { OperationTank } from 'src/app/Models/operationTank';
import { ethers } from 'ethers';
declare let require: any;
declare let window: any;
let RemplissageCentreAdress = require('/build/contracts/RemplissageCol.json');
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedin?: boolean;
  user?: Chef;

  lang?: any;
  cin?: number;
  tel?: number;
  prenom?: String;
  nom?: String;
  connected!: boolean;
  con?: String;
  constructor(
    private translateService: TranslateService,
    public authService: AuthService,
    private chefService: ChefService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.reloadDataRemplissageCentre01();
    this.lang = localStorage.getItem('lang') || 'en';
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.dialog.closeAll();
      this.router.navigate(['/login']);
    }

    this.chefService
      .getUser(JSON.parse(localStorage.getItem('IdUser') || '[]') || [])
      .subscribe((o) => {
        this.cin = o.cin;
        this.tel = o.tel;
        this.nom = o.nom;
        this.prenom = o.prenom;
      });
  }

  changeLang() {
    if (this.lang == 'en') {
      localStorage.setItem('lang', 'fr');
      location.reload();
    }
    if (this.lang == 'fr') {
      localStorage.setItem('lang', 'en');
      location.reload();
    }
  }

  onLogout() {
    this.authService.logout();
  }

  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      location.reload();
    }
    console.log('it does work ');
  }

  operationsRemplissageCol1!: OperationTank[];
  async reloadDataRemplissageCentre01() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const depKEY = Object.keys(RemplissageCentreAdress.networks)[0];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          RemplissageCentreAdress.networks[depKEY].address,
          RemplissageCentreAdress.abi,
          signer
        );
        this.operationsRemplissageCol1 = await contract.getOperationTanks();
        this.connected = true;
        this.con = 'connected';
        localStorage.setItem('state', JSON.stringify(this.con));
      } catch (error) {
        this.connected = false;
        this.con = 'notconnected';
        localStorage.setItem('state', JSON.stringify(this.con));
      }
    }
  }
}
