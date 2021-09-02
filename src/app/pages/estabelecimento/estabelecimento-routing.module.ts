import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEstabelecimentosComponent } from './list-estabelecimentos/list-estabelecimentos.component';

const routes: Routes = [
  {
    path: '',
    component: ListEstabelecimentosComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class EstabelecimentoRoutingModule {}
