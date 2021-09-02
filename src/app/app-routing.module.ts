import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'profissionais',
    loadChildren: () =>
      import('./pages/profissional/profissional-routing.module').then(
        (module) => module.ProfissionalRoutingModule
      ),
  },
  {
    path: 'estabelecimentos',
    loadChildren: () =>
      import('./pages/estabelecimento/estabelecimento-routing.module').then(
        (module) => module.EstabelecimentoRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
