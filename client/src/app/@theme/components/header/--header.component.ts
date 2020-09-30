// import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
// import { Component } from '@angular/core';

// @Component({
//     template: `
//         <nb-layout-header fixed>
//             <nb-user [name]="user?.username" [picture]="user?.picture"></nb-user>
//         </nb-layout-header>
//     `
// })
// export class HeaderComponent {
//     user = {};

//     constructor(private authService: NbAuthService) {
//         this.authService.onTokenChange()
//             .subscribe((token: NbAuthJWTToken) => {
//                 if (token.isValid()) {
//                     this.user = token.getPayload();
//                 }
//             });
//     }
// }