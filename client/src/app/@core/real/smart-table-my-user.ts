import { Observable } from 'rxjs';
// import { MyUser } from './MyUser';

export abstract class SmartTableMyUser {
    abstract getMyUsers(): Observable<any[]>;
    abstract getMyUser(id: number | string);
}
  