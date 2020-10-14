import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivateChild {
    constructor(
        private authService: NbAuthService,
        private router: Router,
    ) { }

    canActivateChild() {
        return this.authService.isAuthenticatedOrRefresh()
            .pipe(
                tap(authenticated => {
                    console.log(`authenticated : ${authenticated}`)
                    if (!authenticated) {
                        this.router.navigate(['auth/login']);
                    }
                }),
            )
    }
}