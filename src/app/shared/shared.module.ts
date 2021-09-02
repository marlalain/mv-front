import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

const prime = [MenubarModule, TableModule, ButtonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...prime],
  exports: [...prime],
})
export class SharedModule {}
