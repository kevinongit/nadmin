import { NgModule } from '@angular/core';
import { NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbTreeGridModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { AdminRoutingModule, routedComponents } from './admin-routing.module';
import { CommonModule } from '@angular/common';

import { FormsModule as ngFormsModule } from '@angular/forms';
import {
  // NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  // NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  // NbUserModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    AdminRoutingModule,
    Ng2SmartTableModule,
    ngFormsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    NbRadioModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdminModule { }
