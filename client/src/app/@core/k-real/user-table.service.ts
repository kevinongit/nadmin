import { Injectable } from '@angular/core';
import { UserTable } from '../k-interface/user-table'
import { Observable, throwError, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';


@Injectable({
  providedIn: 'root'
})
export class UserTableService extends UserTable {

  private readonly endpoint = "http://localhost:3000/v1/users"
  private _myUsers: Subject<Array<any>> //= new Subject<Array<any>>()

  public readonly myUsers: Observable<Array<any>> //= this._myUsers.asObservable()

  constructor(private http: HttpClient,
              private authService: NbAuthService,
    ) { 
    super(); 
    this._myUsers = new BehaviorSubject<Array<any>>([])
    this.myUsers = this._myUsers.asObservable()
  }

  fetchUsers() {
    this.authService.getToken()
      .subscribe(token => {
          const accessToken = token.getValue();
          console.log(`token=${JSON.stringify(token)}`)
          console.log(`accessToken=${JSON.stringify(accessToken)}`);

          const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'x-access-token': accessToken,
            'Authorization' : 'Bearer ' + accessToken,
          };
          const options = {
            headers,
          }

          this.http.get<any>(this.endpoint, options)
          .subscribe(response => {
            console.log(`response.results = ${JSON.stringify(response.results)}`)
            this._myUsers.next(response.results)
          })
      })
  }

  /// 2021.02.02 not this way - the lifecycle of BehaviorSubject, 
  ///   when to create and when to complete
  clear() {
    this._myUsers.next([]);
    // this._myUsers.complete();
    console.log('_myUser initialized!')
  }

  loadAll() : void {
    console.log('getUsers')
    this.authService.getToken()
      .subscribe(token => {
        const accessToken = token.getValue();
        console.log(`token=${JSON.stringify(token)}`)
        console.log(`accessToken=${JSON.stringify(accessToken)}`);

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'x-access-token': accessToken,
          'Authorization' : 'Bearer ' + accessToken,
        };
        const options = {
          headers,
        }

        // this.myUsers = this.http.get<any>(this.myUserUrl, options);
      })
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was : ${error.error}`
  //     );
  //   }
  //   return throwError('Something bad happened: please try again later.');
  // }

  getUsers(): Observable<any> {
    this.loadAll();
    return this.myUsers;
  }

  getUserList(filters): Observable<any[]> {
    console.log('getUserList')
    this.authService.getToken()
      .subscribe(token => {
        const accessToken = token.getValue();
        console.log(`token=${JSON.stringify(token)}`)
        console.log(`accessToken=${JSON.stringify(accessToken)}`);

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-access-token': accessToken,
        };
        const options = {
          headers,
        }

        // this.myUsers =  this.http.post<any[]>(this.myUserUrl, filters, options);
      })

      // return this.http.post<any[]>(this.myUserUrl)
    /// is this work???
    return this.myUsers;
  }

  getUser(id: number | string) {
    console.log(this.myUsers)
    // if (!this.myUsers) return of(null);
    
    return this.myUsers?.pipe(
      map((users: any[]) => users.find(user => user.id === id))
    ) || of(null);
  }
}
