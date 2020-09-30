import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SmartTableMyUserService } from 'app/@core/real/smart-table-my-user.service';
import { OnInit, Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';


@Component({
    selector: 'ngx-smart-detail',
    templateUrl: './smart-detail.component.html',
    styleUrls: ['./smart-detail.component.scss'],
  })
  export class SmartDetailComponent implements OnInit {
      user$: Observable<any>;

      constructor(
          private route: ActivatedRoute,
          private router: Router,
          private service: SmartTableMyUserService
      ) { }

      ngOnInit() {
          this.user$ = this.route.paramMap.pipe(
              switchMap((params: ParamMap) => 
                this.service.getMyUser(params.get('id')))
          );
      }

      gotoTable(user: any) {
          const id = user ? user.id : null;
        //   this.router.navigate(['smart-detail', {id: id, foo: 'foo' }]);
          this.router.navigate(['/pages', 'tables', 'smart-table']).then(nav => {
            console.log(`nav = ${nav}`);
          }, err => {
            console.log(`err = ${err}`);
          })
      }
  }
  