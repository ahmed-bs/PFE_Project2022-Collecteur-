import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { OperationRoutingModule } from './operation-routing.module';
import { CreateOperationRetraitComponent } from './create-operation-retrait/create-operation-retrait.component';
import { UpdateOperationRetraitComponent } from './update-operation-retrait/update-operation-retrait.component';
import { DetailsOperationRetraitComponent } from './details-operation-retrait/details-operation-retrait.component';
import { ListeOperationRetraitComponent } from './liste-operation-retrait/liste-operation-retrait.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MatDialogModule} from "@angular/material/dialog";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// AddForPaginator
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
//add For Sorted
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ListeOperationComponent,
    CreateOperationComponent,
    UpdateOperationComponent,
    DetailsOperationComponent,
    CreateOperationRetraitComponent,
    UpdateOperationRetraitComponent,
    DetailsOperationRetraitComponent,
    ListeOperationRetraitComponent
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,

    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
     //add For Sorted
     MatSortModule,
     // AddForPaginator
     MatPaginatorModule,
     MatFormFieldModule,
     MatInputModule,
     MatTableModule,
     MatSnackBarModule,
   
  ]
})
export class OperationModule { }
