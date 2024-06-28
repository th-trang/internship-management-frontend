import { CommonModule } from '@angular/common';
import {ChangeDetectorRef, Component, OnInit, ViewChild, effect, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSidenavModule} from "@angular/material/sidenav";
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { APP_NAME } from '../../constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from '../../services';
import { StorageService } from '../../services/storage.service';
import { StudentService } from '../../services/student.service';
import { LecturerInternshipManagementComponent } from './lecturer-internship-management/lecturer-internship-management.component';
import { LecturerInternshipScoreComponent } from './lecturer-internship-score/lecturer-internship-score.component';
import { LecturerInternshipReportComponent } from './lecturer-internship-report/lecturer-internship-report.component'

@Component({
  selector: 'app-lecturer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLinkActive,
    MatBadgeModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    LecturerInternshipManagementComponent,
    LecturerInternshipScoreComponent,
    LecturerInternshipReportComponent,
  ],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.scss'
})
export class LecturerComponent{
 public APP_NAME = APP_NAME;
 store = inject(StorageService);
 user: any = signal({ role_id: '', role_name:''});
 routes: any = signal(null);
 role: any = signal('')
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
   private data: StudentService
 ) {
   effect(() => {}, this.user);
   this.mobileQuery = media.matchMedia("(max-width: 250px)");
   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
   this.mobileQuery.addListener(this._mobileQueryListener);
 }

 ngOnDestroy(): void {
   this.mobileQuery.removeListener(this._mobileQueryListener);
 }

 ngOnInit(): void {
   this.role.set(localStorage.getItem('ROLE'));
   this.routes.set(this.router.config.filter(route => route?.path === 'teacher')[0].children)
  //add method to get lecturer name
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
