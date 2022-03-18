import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChefRoutingModule } from './chef/chef-routing.module';
import { AgriculteurRoutingModule } from './chef/agriculteur/agriculteur-routing.module';
import { UsineRoutingModule } from './chef/usine/usine-routing.module';
import { TankRoutingModule } from './chef/tank/tank-routing.module';
import { OperationRoutingModule } from './chef/operation/operation-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChefRoutingModule,
    AgriculteurRoutingModule,
    UsineRoutingModule,
    TankRoutingModule,
    OperationRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
