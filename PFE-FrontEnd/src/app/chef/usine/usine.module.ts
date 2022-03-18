import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeUsineComponent } from './liste-usine/liste-usine.component';
import { CreateUsineComponent } from './create-usine/create-usine.component';
import { UpdateUsineComponent } from './update-usine/update-usine.component';
import { DetailsUsineComponent } from './details-usine/details-usine.component';
import { UsineRoutingModule } from './usine-routing.module';



@NgModule({
  declarations: [
    ListeUsineComponent,
    CreateUsineComponent,
    UpdateUsineComponent,
    DetailsUsineComponent
  ],
  imports: [
    CommonModule,
    UsineRoutingModule,
  ]
})
export class UsineModule { }
