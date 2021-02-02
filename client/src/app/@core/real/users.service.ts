import { of as observableOf,  Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User2Data } from '../data/users2';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class UserService extends User2Data {

  protected user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: NbAuthService) {
    super();
    this.authService
      .onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          const payload = token.getPayload()
          console.log(`payload = ${JSON.stringify(payload)}`)
          this.publishUser(token.getPayload());
        }
      })
  }

  private publishUser(user: any) {
    this.user$.next(user);
  }

  onUserChange(): Observable<any> {
    return this.user$;
  }


  
}
