import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeTankComponent } from './liste-tank/liste-tank.component';
import { UpdateTankComponent } from './update-tank/update-tank.component';
import { CreateTankComponent } from './create-tank/create-tank.component';
import { DetailsTankComponent } from './details-tank/details-tank.component';
import { TankRoutingModule } from './tank-routing.module';



@NgModule({
  declarations: [
    ListeTankComponent,
    UpdateTankComponent,
    CreateTankComponent,
    DetailsTankComponent
  ],
  imports: [
    CommonModule,
    TankRoutingModule,
  ]
})
export class TankModule { }
