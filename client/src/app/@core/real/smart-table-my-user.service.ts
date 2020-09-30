import { Injectable } from '@angular/core';
// import { SmartTableData } from '../data/smart-table';
import { SmartTableMyUser } from './smart-table-my-user'
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MyUser } from './MyUser'
import { FakeData } from './fake'


@Injectable({
  providedIn: 'root'
})
export class SmartTableMyUserService extends SmartTableMyUser {
  myUsers : Observable<any[]>;
  myUserUrl = 'http://localhost:3000/myusers';

  

  constructor(private http: HttpClient) { 
    super(); 
    this.loadAll();
  }

  private loadAll() {
    this.myUsers = this.http.get<any[]>(this.myUserUrl)
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

  getMyUsers2() : Observable<any[]> {
    return of(FakeData);
  }

  getMyUsers() : Observable<any[]> {
    // this.myUsers = this.http.get<any[]>(this.myUserUrl);
    return this.myUsers;
      // .pipe(
      //   // tap(_ => this.log('fetched myuser')),
      //   catchError(this.handleError<any[]>('getMyUser', []))
      // )
  }

  getMyUser(id: number | string) {
    console.log(this.myUsers)
    return this.myUsers.pipe(
      map((users: any[]) => users.find(user => user.id === +id))
    );
  }
}
