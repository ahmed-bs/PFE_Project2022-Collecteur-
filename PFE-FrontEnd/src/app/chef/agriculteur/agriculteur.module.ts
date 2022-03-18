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

  ]
})
export class AgriculteurModule { }
