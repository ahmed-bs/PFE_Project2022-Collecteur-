import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { OperationComponent } from './operation.component';
import { ListeOperationRetraitComponent } from './liste-operation-retrait/liste-operation-retrait.component';
import { UpdateOperationRetraitComponent } from './update-operation-retrait/update-operation-retrait.component';
import { ListeOperationTankComponent } from './liste-operation-tank/liste-operation-tank.component';

const routes: Routes = [
  { path: '', component: OperationComponent },
  { path: 'listeOperation', component: ListeOperationComponent },
  { path: 'addOperation', component: CreateOperationComponent },
  { path: 'addOperationR', component: CreateOperationComponent },
  { path: 'detailsOperation/:id', component: DetailsOperationComponent },
  { path: 'updateOperation/:id', component: UpdateOperationComponent },
  { path: 'updateOperationR/:id', component: UpdateOperationRetraitComponent },
  { path: 'listeOperationRetrait', component: ListeOperationRetraitComponent },
  { path: 'listeOperationTank', component: ListeOperationTankComponent },
  { path: '', redirectTo: '/operation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationRoutingModule {}
