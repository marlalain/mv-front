import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfissionalComponent } from './edit-profissional/edit-profissional.component';
import { ListProfissionaisComponent } from './list-profissionais/list-profissionais.component';
import { NewProfissionalComponent } from './new-profissional/new-profissional.component';
import { ViewProfissionalComponent } from './view-profissional/view-profissional.component';

const routes: Routes = [
  {
    path: '',
    component: ListProfissionaisComponent,
  },
  {
    path: 'edit/:id',
    component: EditProfissionalComponent,
  },
  {
    path: 'view/:id',
    component: ViewProfissionalComponent,
  },
  {
    path: 'new',
    component: NewProfissionalComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class ProfissionalRoutingModule {}
