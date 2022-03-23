import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationTank } from 'src/app/Models/operationTank';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { DetailsOperationTankComponent } from '../details-operation-tank/details-operation-tank.component';

@Component({
  selector: 'app-liste-operation-tank',
  templateUrl: './liste-operation-tank.component.html',
  styleUrls: ['./liste-operation-tank.component.css']
})
export class ListeOperationTankComponent implements OnInit {

  
  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';


  ELEMENT_DATA?:Operation[];
  operation?:Operation;
  dataSource!:MatTableDataSource<any>;
  v=0;
  displayedColumns: string[] = ['idOpTank','operation','idTank','matricule','date', 'qteInsereTank','action'];
  constructor(
    private operationService: OperationService, 
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
        this.operationService.getOperationsTanks().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
    detailsOperationTank(operation:OperationTank){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperationTank', JSON.stringify(operation.idOpTank));
      this.dialog.open(DetailsOperationTankComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
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


