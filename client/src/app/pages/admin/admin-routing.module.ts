import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailComponent } from './user-table/user-detail.component';


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'user-table',
      component: UserTableComponent,
    },
    {
      path: 'user-detail/:id',
      component: UserDetailComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [
  AdminComponent,
  UserTableComponent,
  UserDetailComponent,
];
