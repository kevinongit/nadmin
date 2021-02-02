import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { UserTableService } from '../../../@core/k-real/user-table.service'
import { Router } from '@angular/router';
import { PictureRenderComponent } from './picture-render.component'
import { NbAuthService } from '@nebular/auth';
import { concatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {

  users$: Observable<any[]>

  settings = {
    hideSubHeader: true,
    actions: null,
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
      // _id: {
      //   title: 'ID',
      //   type: 'string',
      // },
      picture: {
        title: 'PICTURE',
        type: 'custom',
        renderComponent: PictureRenderComponent,
      },
      name: {
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

  // constructor(
  //   private service: UserTableService, 
  //   private router: Router) {
  //   const data = this.service.getUsers();
  //   data.subscribe(d => {
  //     console.log(`data ${JSON.stringify(d)}`)
  //     this.source.load(d.results)
  //   });
  // }

  constructor(
    // private service: UserTableService,
    private authService: NbAuthService,
    private http: HttpClient,
    private router: Router,
    private userService: UserTableService,
  ) {
    // this.authService.getToken()
    //   .pipe(
    //     concatMap(token => {
    //       const accessToken = token.getValue();
    //       console.log(`token=${JSON.stringify(token)}`)
    //       console.log(`accessToken=${JSON.stringify(accessToken)}`);

    //       const headers = {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         // 'x-access-token': accessToken,
    //         'Authorization' : 'Bearer ' + accessToken,
    //       };
    //       const options = {
    //         headers,
    //       }

    //       return this.http.get<any>("http://localhost:3000/v1/users", options);
    //     })
    //   )
    //   .subscribe(data => {
    //       console.log(`data ${JSON.stringify(data)}`)
    //       this.source.load(data.results) 
    //   })
  }

  ngOnInit() {
    this.userService.fetchUsers()
    this.users$ = this.userService.myUsers
    this.users$.subscribe(data => this.source.load(data))
    // this.source.load(this.users$)
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
    this.router.navigate(['/pages', 'admin', 'user-detail', event.data.id]).then(nav => {
      console.log(`nav = ${nav}`);
    }, err => {
      console.log(`err = ${err}`);
    })
  }
}
