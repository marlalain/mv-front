import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProfissionaisComponent } from './list-profissionais/list-profissionais.component';

const routes: Routes = [
  {
    path: '',
    component: ListProfissionaisComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class ProfissionalRoutingModule {}
