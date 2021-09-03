import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

const angular = [ReactiveFormsModule];

const prime = [
  MenubarModule,
  TableModule,
  ButtonModule,
  InputTextModule,
  ListboxModule,
  ToastModule,
  ConfirmDialogModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...prime, ...angular],
  exports: [...prime, ...angular],
  providers: [ConfirmationService, MessageService],
})
export class SharedModule {}
