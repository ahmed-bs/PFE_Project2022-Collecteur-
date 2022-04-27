import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationComponent } from '../details-operation/details-operation.component';
import { UpdateOperationComponent } from '../update-operation/update-operation.component';
import { ethers } from 'ethers';
import { Observable } from 'rxjs';
import {Location} from "@angular/common";
import { OperationTank } from 'src/app/Models/operationTank';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RemplissageCol.json');
@Component({
  selector: 'app-liste-operation',
  templateUrl: './liste-operation.component.html',
  styleUrls: ['./liste-operation.component.css']
})
export class ListeOperationComponent implements OnInit {

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
  erreur=0;
  err="";
  p=0;
  q=0;

  test1=0;
  test2=0;


  displayedColumns: string[] = ['idOperation','poidsLait', 'dateOperation','agriculteur','code','action'];
  constructor(private operationService: OperationService,
    private tankService:TankService,
    private location:Location,
    private router: Router, private dialog:MatDialog) { }


    operations!: Observable<OperationTank[]>;
    reloadData00() {  
      const depKEY=Object.keys(Remplissage.networks)[0];
      if (typeof window.ethereum !== 'undefined') {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner()
     console.log(signer);
     const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)
     this.operations = contract.getOperationTanks();}
     console.log('**************************4471441714144');
     console.log(this.operations);
    }
    ngOnInit() {
     
      this.reloadData();
      this.reloadData00()
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


      
    
      // this.tankService.getQteLibreAujourdhui().subscribe(

      //   o=>{
      //   console.log(o);
      //   if(o==0){

      //   }
      //   });

    }




 


    reloadData() {
        this.operationService.getOperationsRemplissages().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
        

    }

    deleteOperation(id: number) {
      let confirmation =confirm("Êtes-vous sûr de supprimer l'operation où son id est egale à : "+id+" ??")
      if(confirmation)
      this.operationService.deleteOperation(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Operation a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression de l\'operation !!';
        this.showToast();
      }
    );

  
  }

  deleteOp(id: number){
    this.tankService.getTanksQteGenerale().subscribe(o=>{
      console.log(o);
      this.q=o;
      this.operationService.getOperation(id).subscribe(a=>{
        console.log(a.poidsLait);
        console.log(id);
        this.p=a.poidsLait;

        this.operationService.getNbOpTankTotal(id).subscribe(b=>{
          console.log(b);
          this.test1=b;

          this.operationService.getNbOpTank(id).subscribe(c=>{
            console.log(c);
            this.test2=c;
  

            if(this.p<=this.q && this.test1==this.test2){
              this.deleteOperation(id);

        } else {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] ='Vous avez deja utiliser la quantite de laits inserée dans les tanks affectees a cette operation !!';
          this.showToast();
        }

      });
    });
  });

    });
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

    detailsOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(DetailsOperationComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }

    updateOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(UpdateOperationComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }

    onOpenDialogCreate():void{
      this.tankService.getQteLibreAujourdhui().subscribe(

        o=>{
        console.log(o);
        if(o>0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationComponent, dialogConfig);
      this.erreur=0;
        }
        else{
            this.erreur=1;
            this.idContenu = 'TostDangerContenu';
            this.idTitle = 'TostDangerTile';
            this.Toast[0] = 'Erreur';
            this.Toast[1] ='Les tanks sont totalment remplis !!';
            this.showToast();
        }
        });
    }

    onOpenDialogCreate2():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationComponent, dialogConfig);
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
      }, 12100);
      this.intervalId = setInterval(() => {
        this.counter = this.counter + 1;
     //   console.log(this.counter);
        if (this.counter === 15)
        clearInterval(this.intervalId);
      }, 1000);
      this.counter=0

    }

  }


