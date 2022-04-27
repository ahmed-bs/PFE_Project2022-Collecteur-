import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes , CanActivate} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes :Routes =[
  {path:'login',component:LoginComponent },
  {path:'chef', loadChildren: () => import('./chef/chef.module').then(m => m.ChefModule) },
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'**', component: NotFoundComponent},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
    // NotFoundComponent
  ]
})
export class AppRoutingModule { }
