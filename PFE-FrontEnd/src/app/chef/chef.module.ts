import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgriculteurComponent } from './agriculteur/agriculteur.component';
import { UsineComponent } from './usine/usine.component';
import { OperationComponent } from './operation/operation.component';
import { TankComponent } from './tank/tank.component';
import { ChefRoutingModule } from './chef-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChefComponent } from './chef.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScaleLinear, ScalePoint, ScaleTime,ScaleBand } from 'd3-scale';
import { DashboardComponent } from './dashboard/dashboard.component'



@NgModule({
  declarations: [
    ChefComponent,
    AgriculteurComponent,
    UsineComponent,
    OperationComponent,
    TankComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent

  ],
  imports: [
    CommonModule,
    ChefRoutingModule,
    NgxChartsModule,
    MatSnackBarModule,
    
  ]
})
export class ChefModule { }
