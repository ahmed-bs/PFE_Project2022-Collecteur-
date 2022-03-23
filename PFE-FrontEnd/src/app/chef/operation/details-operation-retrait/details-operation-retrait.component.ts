import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';

@Component({
  selector: 'app-details-operation-retrait',
  templateUrl: './details-operation-retrait.component.html',
  styleUrls: ['./details-operation-retrait.component.css']
})
export class DetailsOperationRetraitComponent implements OnInit {
  id!: number;
  idO!: any;
  operation?:Operation = new Operation();

  constructor(
    private dialogClose: MatDialog,
    private route: ActivatedRoute,private router: Router,
    private operationService: OperationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.operationService.getOperation(JSON.parse(localStorage.getItem('IdOperation') || '[]') || []).subscribe(o =>{
      this.operation = o;
      this.idO=this.operation?.idOperation;
      //console.log(typeof this.OneOffer);
      console.log(this.operation);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}

