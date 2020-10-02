import { Observable } from 'rxjs';

export abstract class UserTable {
    abstract getUsers(): Observable<any[]>;
    abstract getUser(id: number | string);
}