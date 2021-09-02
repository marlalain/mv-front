import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEstabelecimentosComponent } from './list-estabelecimentos/list-estabelecimentos.component';
import { NewEstabelecimentoComponent } from './new-estabelecimento/new-estabelecimento.component';
import { EditEstabelecimentoComponent } from './edit-estabelecimento/edit-estabelecimento.component';
import { ViewEstabelecimentoComponent } from './view-estabelecimento/view-estabelecimento.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListEstabelecimentosComponent,
    NewEstabelecimentoComponent,
    EditEstabelecimentoComponent,
    ViewEstabelecimentoComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class EstabelecimentoModule {}
