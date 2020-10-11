import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailComponent } from './user-table/user-detail.component';

import { UserMgmtComponet } from './user-mgmt/user-mgmt.component'


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
    {
      path: 'user-mgmt',
      component: UserMgmtComponet,
    }
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

  UserMgmtComponet,
];
