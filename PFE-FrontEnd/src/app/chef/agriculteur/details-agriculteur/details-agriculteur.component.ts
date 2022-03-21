import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-agriculteur',
  templateUrl: './details-agriculteur.component.html',
  styleUrls: ['./details-agriculteur.component.css']
})
export class DetailsAgriculteurComponent implements OnInit {
  id!: number;
  idA!: any;
  agriculteur?:Agriculteur = new Agriculteur();

  constructor(
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private agriculteurService: AgriculteurService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.agriculteurService.getAgriculteur(JSON.parse(localStorage.getItem('IdAgriculteur') || '[]') || []).subscribe(o =>{
      this.agriculteur = o;
      this.idA=this.agriculteur?.idAgriculteur;
      //console.log(typeof this.OneOffer);
      console.log(this.agriculteur);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}
