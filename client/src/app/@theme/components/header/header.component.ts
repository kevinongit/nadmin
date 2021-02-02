import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { User2Data } from '../../../@core/data/users2';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { UserTableService } from 'app/@core/k-real/user-table.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: User2Data,
              private userTableService: UserTableService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              private router: Router,
              private breakpointService: NbMediaBreakpointsService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          
          this.user = token.getPayload()
          console.log(`+ token is valid.(${JSON.stringify(this.user)})`)
        } else {
          console.log(`+ error: token is invalid`)
        }
        
      })
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);
    this.userService.onUserChange()
      .subscribe((user:any) => this.user = user);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick()
      .pipe(
        map(({ item : {title }} ) => title ),
        // map( a => a.item),
      )
      .subscribe(title => {
        console.log(`${title} was clicked.`);
        if (title === "Log out") {
          this.authService.logout('email')
            .subscribe(() => {
              console.log('logged out!!!!');
              this.authService.getToken()
                .subscribe(token => console.log(`getToken : ${token}.`))
              this.router.navigate(['/auth', 'login']).then(nav => {
                console.log(`nav = ${nav}`);
              }, err => {
                console.log(`err = ${err}`);
              })
              this.userTableService.clear()
            });
   
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
