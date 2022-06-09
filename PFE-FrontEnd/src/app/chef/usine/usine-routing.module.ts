import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsineComponent } from './usine.component';
import { ListeUsineComponent } from './liste-usine/liste-usine.component';
import { CreateUsineComponent } from './create-usine/create-usine.component';
import { DetailsUsineComponent } from './details-usine/details-usine.component';
import { UpdateUsineComponent } from './update-usine/update-usine.component';


const routes: Routes = [
  { path: '', component: UsineComponent },
  { path: 'listeUsine', component: ListeUsineComponent },
  { path: 'addUsine', component: CreateUsineComponent  },
  { path: 'detailsUsine/:id', component: DetailsUsineComponent   },
  { path: 'updateUsine/:id', component: UpdateUsineComponent  },
  { path:'',redirectTo:'/usine',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsineRoutingModule { }
