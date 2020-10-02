import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { UserTableService } from '../../../@core/k-real/user-table.service'
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'string',
      },
      username: {
        title: 'User Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  // constructor(private service: SmartTableData) {
  //   const data = this.service.getData();
  //   this.source.load(data);
  // }
  constructor(private service: UserTableService, private router: Router) {
    const data = this.service.getUsers();
    data.subscribe(d => {
      console.log(`${d}`)
      this.source.load(d)
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  onUserRowSelect(event): void {
    const selectedRow = event.data;
    console.log(`event : ${JSON.stringify(event.data)}`);
    this.router.navigate(['/pages', 'admin', 'user-detail', event.data._id]).then(nav => {
      console.log(`nav = ${nav}`);
    }, err => {
      console.log(`err = ${err}`);
    })
  }
}
