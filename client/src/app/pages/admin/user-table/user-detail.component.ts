import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserTableService } from 'app/@core/k-real/user-table.service';
import { OnInit, Component } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';


@Component({
    selector: 'ngx-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
  })
  export class UserDetailComponent implements OnInit {
      user$: Observable<any>;

      constructor(
          private route: ActivatedRoute,
          private router: Router,
          private service: UserTableService,
          private location: Location,
      ) { }

      ngOnInit() {
          this.user$ = this.route.paramMap.pipe(
              tap((params: ParamMap) => {
                const id = params.get('id');
                console.log(`id = ${id}`)
              }),
              switchMap((params: ParamMap) => 
                this.service.getUser(params.get('id')))
          );
      }

      gotoTable(user: any) {
          const id = user ? user.id : null;
        //   this.router.navigate(['smart-detail', {id: id, foo: 'foo' }]);
          this.router.navigate(['/pages', 'admin', 'user-table']).then(nav => {
            console.log(`nav = ${nav}`);
          }, err => {
            console.log(`err = ${err}`);
          })
      }

      back() {
        this.location.back();
      }
  }
  