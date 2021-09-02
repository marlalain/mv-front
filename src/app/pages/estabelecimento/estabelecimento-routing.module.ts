import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEstabelecimentoComponent } from './edit-estabelecimento/edit-estabelecimento.component';
import { ListEstabelecimentosComponent } from './list-estabelecimentos/list-estabelecimentos.component';
import { NewEstabelecimentoComponent } from './new-estabelecimento/new-estabelecimento.component';
import { ViewEstabelecimentoComponent } from './view-estabelecimento/view-estabelecimento.component';

const routes: Routes = [
  {
    path: '',
    component: ListEstabelecimentosComponent,
  },
  {
    path: 'edit/:id',
    component: EditEstabelecimentoComponent,
  },
  {
    path: 'view/:id',
    component: ViewEstabelecimentoComponent,
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
export class EstabelecimentoRoutingModule {}
