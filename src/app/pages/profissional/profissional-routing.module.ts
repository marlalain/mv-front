import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEstabelecimentoComponent } from '../estabelecimento/new-estabelecimento/new-estabelecimento.component';
import { EditProfissionalComponent } from './edit-profissional/edit-profissional.component';
import { ListProfissionaisComponent } from './list-profissionais/list-profissionais.component';
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
    component: NewEstabelecimentoComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class ProfissionalRoutingModule {}
