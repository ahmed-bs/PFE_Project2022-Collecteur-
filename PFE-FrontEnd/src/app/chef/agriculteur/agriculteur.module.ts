import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeAgriculteurComponent } from './liste-agriculteur/liste-agriculteur.component';
import { CreateAgriculteurComponent } from './create-agriculteur/create-agriculteur.component';
import { UpdateAgriculteurComponent } from './update-agriculteur/update-agriculteur.component';
import { DetailsAgriculteurComponent } from './details-agriculteur/details-agriculteur.component';
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { AgriculteurRoutingModule } from './agriculteur-routing.module';

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
    ListeAgriculteurComponent,
    CreateAgriculteurComponent,
    UpdateAgriculteurComponent,
    DetailsAgriculteurComponent
  ],
  imports: [
    CommonModule,
    AgriculteurRoutingModule,
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
export class AgriculteurModule{
//  defaultValue= {hour: 13, minute: 30};

// timeChangeHandler(event: Event) {
//   console.log(event);
// }
}

