import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

const prime = [
  MenubarModule,
  TableModule,
  ButtonModule,
  InputTextModule,
  ListboxModule,
  ToastModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...prime],
  exports: [...prime],
  providers: [ConfirmationService, MessageService],
})
export class SharedModule {}
