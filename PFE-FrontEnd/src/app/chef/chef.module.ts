import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgriculteurComponent } from './agriculteur/agriculteur.component';
import { UsineComponent } from './usine/usine.component';
import { OperationComponent } from './operation/operation.component';



@NgModule({
  declarations: [
    AgriculteurComponent,
    UsineComponent,
    OperationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChefModule { }
