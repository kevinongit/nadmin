import { Observable } from 'rxjs';

export abstract class User2Data {
  // abstract getUsers(): Observable<any>;
  abstract onUserChange(): Observable<any>;
}
