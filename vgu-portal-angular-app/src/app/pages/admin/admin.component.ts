import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { APP_NAME } from '../../constants';
import { StorageService } from '../../services/storage.service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from '../../services';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { IntershipManagementComponent } from './intership-management/intership-management.component';
import { DocumentManagementComponent } from './document-management/document-management.component';
import { ReportManagementComponent } from './report-management/report-management.component';
import { ReportScheduleManagementComponent } from './report-schedule-management/report-schedule-management.component';
import { SettingComponent } from './setting/setting.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatSidenavModule,
    RouterLinkActive,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    IntershipManagementComponent,
    DocumentManagementComponent,
    ReportManagementComponent,
    ReportScheduleManagementComponent,
    SettingComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {
  public APP_NAME = APP_NAME;
  store = inject(StorageService);
  routes: any = signal(null);
  user: any = signal({ role_id: '', role_name: '' });
  role: any = signal('');
  hidden: boolean = false;
  mobileQuery: MediaQueryList;
  name: any = signal('');
  menuOpen: boolean = false;
  private _mobileQueryListener: () => void;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(
    private authRepository: AuthenticationService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    effect(() => { }, this.user);
    this.mobileQuery = media.matchMedia("(max-width: 250px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.role.set(localStorage.getItem('ROLE'));
    this.routes.set(this.router.config.filter(route => route?.path === 'admin')[0].children);
    //insert get admin name function
  }

  navigateByRole(childRoute: string) {
    const roleName = localStorage.getItem('ROLE');
    this.router.navigate([`/${roleName}/${childRoute}`]);
  }

  //function which returns the number of notifications to be displayed
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  public onLogout = () => {
    this.user = null;
    this.authRepository.logout();
    this.router.navigate(["/sign-in"]);
  }

}
