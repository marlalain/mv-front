import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfissionalComponent } from './view-profissional/view-profissional.component';
import { EditProfissionalComponent } from './edit-profissional/edit-profissional.component';
import { NewProfissionalComponent } from './new-profissional/new-profissional.component';
import { ListProfissionaisComponent } from './list-profissionais/list-profissionais.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ViewProfissionalComponent,
    EditProfissionalComponent,
    NewProfissionalComponent,
    ListProfissionaisComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ProfissionalModule {}
