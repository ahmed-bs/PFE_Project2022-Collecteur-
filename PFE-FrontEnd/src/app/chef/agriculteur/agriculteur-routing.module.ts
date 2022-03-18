import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListeAgriculteurComponent } from './liste-agriculteur/liste-agriculteur.component';
import { DetailsAgriculteurComponent } from './details-agriculteur/details-agriculteur.component';
import { CreateAgriculteurComponent } from './create-agriculteur/create-agriculteur.component';
import { UpdateAgriculteurComponent } from './update-agriculteur/update-agriculteur.component';
import { AgriculteurComponent } from './agriculteur.component';

const routes: Routes = [
  { path: '', component: AgriculteurComponent },
  { path: 'listeAgriculteur', component: ListeAgriculteurComponent },
  { path: 'addAgriculteur', component: CreateAgriculteurComponent  },
  { path: 'detailsAgriculteur/:id', component: DetailsAgriculteurComponent   },
  { path: 'updateAgriculteur/:id', component: UpdateAgriculteurComponent  },
  { path:'',redirectTo:'/Agriculteur',pathMatch:'full'},
  // {  path:'**', component: AgriculteurComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriculteurRoutingModule { }
