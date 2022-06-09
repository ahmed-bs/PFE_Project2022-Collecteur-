import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-details-agriculteur',
  templateUrl: './details-agriculteur.component.html',
  styleUrls: ['./details-agriculteur.component.css'],
})
export class DetailsAgriculteurComponent implements OnInit {
  id!: number;
  idA!: any;
  agriculteur?: Agriculteur = new Agriculteur();

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private agriculteurService: AgriculteurService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }

    this.id = this.route.snapshot.params['id'];

    this.agriculteurService
      .getAgriculteur(
        JSON.parse(localStorage.getItem('IdAgriculteur') || '[]') || []
      )
      .subscribe((o) => {
        this.agriculteur = o;
        this.idA = this.agriculteur?.idAgriculteur;
        console.log(this.agriculteur);
      });
  }

  closeDetails() {
    this.dialogClose.closeAll();
  }
}
