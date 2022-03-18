import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { DetailsOperationComponent } from './details-operation/details-operation.component';



@NgModule({
  declarations: [
    ListeOperationComponent,
    CreateOperationComponent,
    UpdateOperationComponent,
    DetailsOperationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OperationModule { }
