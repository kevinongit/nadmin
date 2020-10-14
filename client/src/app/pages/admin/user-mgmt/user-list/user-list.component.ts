import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { UserMgmtService } from '../../../../@core/k-real/user-mgmt.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnChanges {
  users: Observable<any[]>;
  @Input() groupFilters: Object;

  constructor(
    private umService: UserMgmtService,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.users = this.umService.users;

    this.umService.loadAll();
  }

  ngOnChanges(): void {
    console.log(`this.grouFilters : ${JSON.stringify(this.groupFilters)}`)
    if (this.groupFilters !== undefined) {
      console.log(this.groupFilters);
      this.umService.loadParam(this.groupFilters);
      this.users.subscribe(data => {
        console.log(`data: ${JSON.stringify(data)}`);
        this.source.load(data);
      })
    }
  }

  settings = {
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      // _id: {
      //   title: 'ID',
      //   type: 'string',
      // },
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


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  onUserRowSelect(event): void {
    return;
    const selectedRow = event.data;
    console.log(`event : ${JSON.stringify(event.data)}`);
    this.router.navigate(['/pages', 'admin', 'user-detail', event.data._id]).then(nav => {
      console.log(`nav = ${nav}`);
    }, err => {
      console.log(`err = ${err}`);
    })
  }
}
