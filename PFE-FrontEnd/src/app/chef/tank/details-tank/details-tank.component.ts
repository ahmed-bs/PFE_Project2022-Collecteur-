import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Services/tank.service';

@Component({
  selector: 'app-details-tank',
  templateUrl: './details-tank.component.html',
  styleUrls: ['./details-tank.component.css']
})
export class DetailsTankComponent implements OnInit {
  id!: number;
  idT!: any;
  tank?:Tank = new Tank();

  constructor(
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private tankService: TankService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.tankService.getTank(JSON.parse(localStorage.getItem('IdTank') || '[]') || []).subscribe(o =>{
      this.tank = o;
      this.idT=this.tank?.idTank;
      //console.log(typeof this.OneOffer);
      console.log(this.tank);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}
