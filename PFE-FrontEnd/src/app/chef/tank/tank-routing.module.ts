import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListeTankComponent } from './liste-tank/liste-tank.component';
import { CreateTankComponent } from './create-tank/create-tank.component';
import { DetailsTankComponent } from './details-tank/details-tank.component';
import { UpdateTankComponent } from './update-tank/update-tank.component';
import { TankComponent } from './tank.component';

const routes: Routes = [
  { path: '', component: TankComponent },
  { path: 'listeTank', component: ListeTankComponent },
  { path: 'addTank', component: CreateTankComponent  },
  { path: 'detailsTank/:id', component: DetailsTankComponent   },
  { path: 'updateTank/:id', component: UpdateTankComponent  },
  { path:'',redirectTo:'/Tank',pathMatch:'full'},
  // {  path:'**', component: TankComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TankRoutingModule { }
