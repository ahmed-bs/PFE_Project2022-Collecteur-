import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { CreateOperationRetraitComponent } from '../create-operation-retrait/create-operation-retrait.component';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationRetraitComponent } from '../details-operation-retrait/details-operation-retrait.component';
import { DetailsOperationComponent } from '../details-operation/details-operation.component';
import { UpdateOperationRetraitComponent } from '../update-operation-retrait/update-operation-retrait.component';

@Component({
  selector: 'app-liste-operation-retrait',
  templateUrl: './liste-operation-retrait.component.html',
  styleUrls: ['./liste-operation-retrait.component.css']
})
export class ListeOperationRetraitComponent implements OnInit {
  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  erreur =0;

  ELEMENT_DATA?:Operation[];
  operation?:Operation;
  dataSource!:MatTableDataSource<any>;
  v=0;
  displayedColumns: string[] = ['idOperation','poidsLait','code', 'dateOperation','usine', 'typeOp','action'];
  constructor(private operationService: OperationService,
    private tankService:TankService,
    private router: Router, private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();
      console.log(this.tankService.getTanksQteLibre());

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
        this.operationService.getOperationsRetraits().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
     deleteOperation(id: number) {
      this.operationService.getOperation(id).subscribe(o =>{
        this.ELEMENT_DATA= o;});
        console.log(this.ELEMENT_DATA);
        //console.log(this.id);
      let confirmation =confirm("Êtes-vous sûr de supprimer le Operation où son id est egale à : "+id+" ??")
      if(confirmation)
      this.operationService.deleteOperation(id).subscribe(data => {
        this.Toast[0] = 'Success';
        this.Toast[1] ='Operation a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        window.location.reload();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du Operation !!';
        this.showToast();
      }
    );
  }
  
    detailsOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(DetailsOperationRetraitComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateOperationR(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(UpdateOperationRetraitComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      this.tankService.getQteG().subscribe(

        o=>{
        console.log(o);
        if(o>0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationRetraitComponent, dialogConfig);
    }
    else{
        this.erreur=1;
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] ='Les tanks sont vide !! \n \n Vous ne pouvez pas faire loperation de retarit !!';
        this.showToast();
    }
    });
}
  
    onOpenDialogCreate2():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationRetraitComponent, dialogConfig);
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


