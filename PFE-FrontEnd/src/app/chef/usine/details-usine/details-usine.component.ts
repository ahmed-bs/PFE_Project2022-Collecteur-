import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Usine } from 'src/app/Models/usine';
import { UsineService } from 'src/app/Services/usine.service';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details-usine',
  templateUrl: './details-usine.component.html',
  styleUrls: ['./details-usine.component.css'],
})
export class DetailsUsineComponent implements OnInit {
  id!: number;
  idU!: any;
  usine?: Usine = new Usine();

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private usineService: UsineService
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

    this.usineService
      .getUsine(JSON.parse(localStorage.getItem('IdUsine') || '[]') || [])
      .subscribe((o) => {
        this.usine = o;
        this.idU = this.usine?.idUsine;
        console.log(this.usine);
      });
  }

  closeDetails() {
    this.dialogClose.closeAll();
  }
}
