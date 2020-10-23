import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
} from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbButtonModule,
        NbCheckboxModule,
        NbInputModule,
        NgxAuthRoutingModule,

        NbAuthModule,
    ],
    declarations: [
        NgxLoginComponent,
    ],
})
export class NgxAuthModule {

}