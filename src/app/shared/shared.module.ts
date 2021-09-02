import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';

const prime = [MenubarModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...prime],
  exports: [...prime],
})
export class SharedModule {}
