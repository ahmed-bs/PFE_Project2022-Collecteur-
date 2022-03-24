import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChefComponent } from './chef.component';
import { DashboardComponent } from './dashboard/dashboard.component'


const routes: Routes = [
  {
    path: '', component: ChefComponent, children: [
      { path: 'agriculteur',loadChildren: () => import('./agriculteur/agriculteur.module').then(m => m.AgriculteurModule)},
      { path: 'operation', loadChildren: () => import('./operation/operation.module').then(m => m.OperationModule) },
       { path: 'usine', loadChildren: () => import('./usine/usine.module').then(m => m.UsineModule) },
       { path: 'tank', loadChildren: () => import('./tank/tank.module').then(m => m.TankModule) },
       { path: 'dashboard', component: DashboardComponent },
      // { path: '**', component: NotFoundComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule { }
