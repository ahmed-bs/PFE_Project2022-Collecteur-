import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgriculteurComponent } from './agriculteur/agriculteur.component';
import { UsineComponent } from './usine/usine.component';
import { OperationComponent } from './operation/operation.component';
import { TankComponent } from './tank/tank.component';
import { ChefRoutingModule } from './chef-routing.module';



@NgModule({
  declarations: [
    AgriculteurComponent,
    UsineComponent,
    OperationComponent,
    TankComponent

  ],
  imports: [
    CommonModule,
    ChefRoutingModule
  ]
})
export class ChefModule { }
