import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-agriculteur',
  templateUrl: './update-agriculteur.component.html',
  styleUrls: ['./update-agriculteur.component.css'],
})
export class UpdateAgriculteurComponent implements OnInit {
  agriculteur: Agriculteur = new Agriculteur();
  CheckesCompetance: boolean = false;
  msg = '';

  myForm = new FormGroup({
    nom: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    prenom: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    matricule: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    adress: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    tel: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9 ]{8}'),
    ]),
  });

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private agriculteurService: AgriculteurService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }

    this.agriculteurService
      .getAgriculteur(
        JSON.parse(localStorage.getItem('IdAgriculteur') || '[]') || []
      )
      .subscribe((o) => {
        this.agriculteur = o;
        console.log(this.agriculteur);
      });
  }

  updateAgriculteur() {
    if (
      this.myForm.get('nom')?.value == null ||
      this.myForm.get('tel')?.value == null ||
      this.myForm.get('prenom')?.value == null ||
      this.myForm.get('adress')?.value == null ||
      this.myForm.get('matricule')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (
      this.myForm.get('nom')?.value != null &&
      this.myForm.get('prenom')?.value != null &&
      this.myForm.get('adress')?.value != null &&
      this.myForm.get('tel')?.value != null &&
      this.myForm.get('tel')?.value.toString().length == 8 &&
      this.myForm.get('nom')?.value.length >= 3 &&
      this.myForm.get('prenom')?.value.length >= 3 &&
      this.myForm.get('adress')?.value.length >= 4 &&
      this.myForm.get('matricule')?.value != null &&
      this.myForm.get('matricule')?.value.length >= 8
    ) {
      this.agriculteurService
        .updateAgriculteur(this.agriculteur.idAgriculteur, {
          nom: this.myForm.get('nom')?.value,
          prenom: this.myForm.get('prenom')?.value,
          matricule: this.myForm.get('matricule')?.value,
          adress: this.myForm.get('adress')?.value,
          tel: this.myForm.get('tel')?.value,
        })
        .subscribe(
          (o) => {
            localStorage.setItem(
              'Toast',
              JSON.stringify([
                'Success',
                'Un agriculteur a été modifié avec succès',
              ])
            );

            this.onClose();
            console.log(this.agriculteur);
          },
          (error) => {
            console.log('Failed');
          }
        );
    }
  }

  get nom() {
    return this.myForm.get('nom');
  }

  get prenom() {
    return this.myForm.get('prenom');
  }

  get adress() {
    return this.myForm.get('adress');
  }

  get tel() {
    return this.myForm.get('tel');
  }

  get matricule() {
    return this.myForm.get('matricule');
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
}
