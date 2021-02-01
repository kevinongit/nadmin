import { Injectable } from '@angular/core';
import { UserTable } from '../k-interface/user-table'
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserMgmtService {
  private _users = new BehaviorSubject<any[]>([]);
  private baseUrl = 'http://localhost:3000/v1/users';
  private dataStore: { users: any[] } = { users: []};
  readonly users = this._users.asObservable();

  constructor(private http: HttpClient,
              private router: Router,
              private authService: NbAuthService,
    ) { 
      this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {
        console.log('token changed');
        this._users.next([])
      })
  }

 

  loadParam(filters) {
    this.authService.getToken()
      .subscribe(token => {
        if (!token.isValid()) {
          this.router.navigate(['auth/login']);
        }
        const accessToken = token.getValue();
        console.log(`accessToken=${JSON.stringify(accessToken)}`);
        const options = {
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': accessToken,
          },
          params : new HttpParams({
            fromObject: filters,
          })
        };

        this.http.get<any[]>(this.baseUrl, options).subscribe(
          data => {
            this.dataStore.users = data;
            this._users.next(Object.assign({}, this.dataStore).users);
          },
          error => console.log(`Could not load users(error:${error})`)
        );
      })
  }

  load(id: number | string) {
    this.http.get<any>(`this.baseUrl/${id}`).subscribe(data => {
        let notFound = true;

        this.dataStore.users.forEach((item, index) => {
          if (item._id === data._id) {
            this.dataStore.users[index] = data;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.users.push(data);
        }
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => console.log(`Cound not load user(error:${error})`)
    );
  }

  create(user: any) {
    this.http.post<any>(`${this.baseUrl}/signup`, JSON.stringify(user))
      .subscribe(data => {
          this.dataStore.users.push(data);
          this._users.next(Object.assign({}, this.dataStore).users);
        },
        error => console.log(`Could not create a user(error:${error})`)
      );
  }

  update(user: any) {
    this.http.put<any>(`${this.baseUrl}/${user._id}`, JSON.stringify(user))
      .subscribe(
        data => {
          this.dataStore.users.forEach((u, i) => {
            if (u._id === data._id) {
              this.dataStore.users[i] = data;
            }
          });
          this._users.next(Object.assign({}, this.dataStore).users);
        },
        error => console.log(`Could not update a user(error:${error})`)
      );
  }

  remove(_id: string) {
    this.http.delete(`${this.baseUrl}/${_id}`)
      .subscribe(
        resp => {
          this.dataStore.users.forEach((u, i) => {
            if (u._id === _id) {
              this.dataStore.users.splice(i, 1);
            }
          });
          this._users.next(Object.assign({}, this.dataStore).users);
        },
        error => console.log(`Could not delete todo(error:${error})`)
      );
  }

  // getUserList(filters): Observable<any[]> {
  //   console.log('getUserList')
  //   this.authService.getToken()
  //     .subscribe(token => {
  //       const accessToken = token.getValue();
  //       console.log(`token=${JSON.stringify(token)}`)
  //       console.log(`accessToken=${JSON.stringify(accessToken)}`);

  //       const headers = {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'x-access-token': accessToken,
  //       };
  //       const options = {
  //         headers,
  //       }

  //       this.myUsers =  this.http.post<any[]>(this.myUserUrl, filters, options);
  //     })

  //     // return this.http.post<any[]>(this.myUserUrl)
  //   /// is this work???
  //   return this.myUsers;
  // }

  // getUser(id: number | string) {
  //   console.log(this.myUsers)
  //   // if (!this.myUsers) return of(null);
  //   return this.myUsers?.pipe(
  //     map((users: any[]) => users.find(user => user._id === id))
  //   ) || of(null);
  // }
}
