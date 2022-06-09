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
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ChefComponent,
    AgriculteurComponent,
    UsineComponent,
    OperationComponent,
    TankComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ChefRoutingModule,
    NgxChartsModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class ChefModule {}
