import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Services/agriculteur.service';
import { DetailsAgriculteurComponent } from '../details-agriculteur/details-agriculteur.component';
import { UpdateAgriculteurComponent } from '../update-agriculteur/update-agriculteur.component';
import { CreateAgriculteurComponent } from '../create-agriculteur/create-agriculteur.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-liste-agriculteur',
  templateUrl: './liste-agriculteur.component.html',
  styleUrls: ['./liste-agriculteur.component.css']
})
export class ListeAgriculteurComponent implements OnInit {
  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Agriculteur[];
  agriculteur?:Agriculteur;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idAgriculteur','nom','matricule','adress','tel','action'];

  constructor(private translateService :TranslateService,
    private agriculteurService: AgriculteurService,
    private router: Router,
    private authService:AuthService,
    private location:Location,
    private dialog:MatDialog) { 
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
    }


    ngOnInit() {

      this.authService.loadToken();
      if (this.authService.getToken()==null || 
          this.authService.isTokenExpired()){
            this.router.navigate(['/login']);
       
          }

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
        this.agriculteurService.getAgriculteurs().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
   

    deleteagriculteur(id:number){
      this.authService.loadToken();
      if (this.authService.getToken()==null || 
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
       
          }
      let confirmation =confirm("Êtes-vous sûr de supprimer l'agriculteur où son id est egale à : "+id+" ??")
      if(confirmation)
      this.agriculteurService.deleteagriculteur(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='agriculteur a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
       this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression de l\'agriculteur !!';
        this.showToast();
      }
    );
  }
  
  onReload(){
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'",{skipLocationChange: true}).then( response=> {
      this.router.navigate([decodeURI(this.location.path())]);
    })
}


onClose() {
  this.dialog.closeAll();
  // this.gotoList();
  this.onReload();
}
  
  
    detailsagriculteur(agriculteur:Agriculteur){
      this.authService.loadToken();
      if (this.authService.getToken()==null || 
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
       
          }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdAgriculteur', JSON.stringify(agriculteur.idAgriculteur));
      this.dialog.open(DetailsAgriculteurComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateagriculteur(agriculteur:Agriculteur){
      this.authService.loadToken();
      if (this.authService.getToken()==null || 
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
       
          }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdAgriculteur', JSON.stringify(agriculteur.idAgriculteur));
      this.dialog.open(UpdateAgriculteurComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      this.authService.loadToken();
      if (this.authService.getToken()==null || 
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
       
          }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateAgriculteurComponent, dialogConfig);
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

