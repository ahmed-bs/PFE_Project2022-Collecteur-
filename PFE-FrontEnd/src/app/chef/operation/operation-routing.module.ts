import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { OperationComponent } from './operation.component';
import { ListeOperationRetraitComponent } from './liste-operation-retrait/liste-operation-retrait.component';
import { CreateOperationRetraitComponent } from './create-operation-retrait/create-operation-retrait.component';
import { UpdateOperationRetraitComponent } from './update-operation-retrait/update-operation-retrait.component';
import { DetailsOperationRetraitComponent } from './details-operation-retrait/details-operation-retrait.component';
import { ListeOperationTankComponent } from './liste-operation-tank/liste-operation-tank.component';



const routes: Routes = [
  {  path: '', component: OperationComponent,},
  { path: 'listeOperation', component: ListeOperationComponent },
  { path: 'addOperation', component: CreateOperationComponent  },
  { path: 'addOperationR', component: CreateOperationComponent  },
  { path: 'detailsOperation/:id', component: DetailsOperationComponent   },
  { path: 'updateOperation/:id', component: UpdateOperationComponent  },
  { path: 'updateOperationR/:id', component: UpdateOperationRetraitComponent },
  // { path: 'operationPage', component: PageOperationsComponent  },
  { path: 'listeOperationRetrait', component:     ListeOperationRetraitComponent  },
  { path: 'listeOperationTank', component: ListeOperationTankComponent },
  // { path: 'detailsOperationTank/:id', component: DetailsOperationTankComponent  },
  { path:'',redirectTo:'/operation',pathMatch:'full'},
  // {  path:'**', component: OperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
