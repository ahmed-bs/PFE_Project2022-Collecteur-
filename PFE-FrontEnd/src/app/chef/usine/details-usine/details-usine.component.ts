import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Usine } from 'src/app/Models/usine';
import { UsineService } from 'src/app/Services/usine.service';

@Component({
  selector: 'app-details-usine',
  templateUrl: './details-usine.component.html',
  styleUrls: ['./details-usine.component.css']
})
export class DetailsUsineComponent implements OnInit {
  id!: number;
  idU!: any;
  usine?:Usine = new Usine();

  constructor(
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private usineService: UsineService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.usineService.getUsine(JSON.parse(localStorage.getItem('IdUsine') || '[]') || []).subscribe(o =>{
      this.usine = o;
      this.idU=this.usine?.idUsine;
      //console.log(typeof this.OneOffer);
      console.log(this.usine);
      // console.log(this.idM);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}
