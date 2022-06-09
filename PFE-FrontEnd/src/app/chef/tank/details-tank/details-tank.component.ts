import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Services/tank.service';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details-tank',
  templateUrl: './details-tank.component.html',
  styleUrls: ['./details-tank.component.css'],
})
export class DetailsTankComponent implements OnInit {
  id!: number;
  idT!: any;
  tank?: Tank = new Tank();

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private tankService: TankService
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

    this.tankService
      .getTank(JSON.parse(localStorage.getItem('IdTank') || '[]') || [])
      .subscribe((o) => {
        this.tank = o;
        this.idT = this.tank?.idTank;
        console.log(this.tank);
      });
  }

  closeDetails() {
    this.dialogClose.closeAll();
  }
}
