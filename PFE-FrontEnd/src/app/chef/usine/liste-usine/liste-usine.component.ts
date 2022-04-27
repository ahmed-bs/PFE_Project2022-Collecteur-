import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateUsineComponent } from '../update-usine/update-usine.component';
import { DetailsUsineComponent } from '../details-usine/details-usine.component';
import { CreateUsineComponent } from '../create-usine/create-usine.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Usine } from 'src/app/Models/usine';
import {Location} from "@angular/common";
import { UsineService } from 'src/app/Services/usine.service';

@Component({
  selector: 'app-liste-usine',
  templateUrl: './liste-usine.component.html',
  styleUrls: ['./liste-usine.component.css']
})
export class ListeUsineComponent implements OnInit {
  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Usine[];
  usine?:Usine;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idUsine','nomUsine','adresse','action'];

  constructor(
    private location:Location,
    private usineService: UsineService,
    private router: Router,
    private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();

      this.idContenu = 'TostSuccessContenu';
      this.idTitle = 'TostSuccessTile';
  
      this.Toast = JSON.parse(localStorage.getItem('Toast') || '[]') || [];
      if (this.Toast[0] == 'Success') {
        console.log('Toast est n est pas vide');
        this.showToast();
      } else {
        console.log('Toast Vide');
      }
  
     
    }
  
    reloadData() {
        this.usineService.getUsines().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
   

    deleteUsine(id:number){
      let confirmation =confirm("Êtes-vous sûr de supprimer l'usine où son id est egale à : "+id+" ??")
      if(confirmation)
      this.usineService.deleteUsine(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Usine a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du Usine !!';
        this.showToast();
      }
    );
  }
  
  onReload(){
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/bon/listeCollecteur",{skipLocationChange: true}).then( response=> {
      this.router.navigate([decodeURI(this.location.path())]);
    })
}


onClose() {
  this.dialog.closeAll();
  // this.gotoList();
  this.onReload();
}
  
    detailsUsine(usine:Usine){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdUsine', JSON.stringify(usine.idUsine));
      this.dialog.open(DetailsUsineComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateUsine(usine:Usine){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdUsine', JSON.stringify(usine.idUsine));
      this.dialog.open(UpdateUsineComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateUsineComponent, dialogConfig);
    }
  
  
  
    filterData($event:any){
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
      }, 6100);
      this.intervalId = setInterval(() => {
        this.counter = this.counter + 1;
        console.log(this.counter);
        if (this.counter === 6)
        clearInterval(this.intervalId);
      }, 1000);
      this.counter=0
  
    }
  
  }

