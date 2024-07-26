import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { APP_NAME } from '../../constants';
import { InformationComponent } from './information/information.component';
import { SubmissionComponent } from './submission/submission.component';
import { SeminarInvitationComponent } from './seminar-invitation/seminar-invitation.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services';
import { MediaMatcher } from '@angular/cdk/layout';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatSidenavModule,
    RouterLinkActive,
    InformationComponent,
    SubmissionComponent,
    SeminarInvitationComponent,
    MatBadgeModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit, OnDestroy {

  public APP_NAME = APP_NAME;
  store = inject(StorageService);
  user: any = signal({ role_id: '', role_name: '' });
  routes: any = signal(null);
  role: any = signal('')
  hidden: boolean = false;
  mobileQuery: MediaQueryList;
  name: any = signal('');
  menuOpen: boolean = false;
  private _mobileQueryListener: () => void;
  selectedItemPath: string | null = null;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(
    private authRepository: AuthenticationService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private data: StudentService
  ) {
    effect(() => { }, this.user);
    this.mobileQuery = media.matchMedia("(max-width: 250px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.role.set(localStorage.getItem('ROLE'));
    this.routes.set(this.router.config.filter(route => route?.path === 'student')[0].children);
    this.data.getStudentById('1').subscribe((res) => {
      this.name.set(res.data.name);
    })
  }

  navigateByRole(childRoute: string) {
    const roleName = localStorage.getItem('ROLE');
    this.router.navigate([`/${roleName}/${childRoute}`]);
    this.selectedItemPath = this.selectedItemPath === childRoute ? null : childRoute;
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
