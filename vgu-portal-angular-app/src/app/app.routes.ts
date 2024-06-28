import { Routes } from "@angular/router";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { StudentComponent } from "./pages/student/student.component";
import { LecturerComponent } from "./pages/lecturer/lecturer.component";
import { DocumentManagementComponent } from "./pages/admin/document-management/document-management.component";
import { ReportManagementComponent } from "./pages/admin/report-management/report-management.component";
import { ReportScheduleManagementComponent } from "./pages/admin/report-schedule-management/report-schedule-management.component";
import { IntershipManagementComponent } from "./pages/admin/intership-management/intership-management.component";
import { SettingComponent } from "./pages/admin/setting/setting.component";
import { authenticationGuard } from "./helpers/auth.guard";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LecturerInternshipReportComponent } from "./pages/lecturer/lecturer-internship-report/lecturer-internship-report.component";
import { LecturerInternshipManagementComponent } from "./pages/lecturer/lecturer-internship-management/lecturer-internship-management.component";
import { LecturerInternshipScoreComponent } from "./pages/lecturer/lecturer-internship-score/lecturer-internship-score.component";
import { InformationComponent } from "./pages/student/information/information.component";
import { SubmissionComponent } from "./pages/student/submission/submission.component";
import { SeminarInvitationComponent } from "./pages/student/seminar-invitation/seminar-invitation.component";
import { IntershipResultComponent } from "./pages/student/intership-result/intership-result.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/sign-in",
    pathMatch: "full",
  },
  {
    path: "sign-in",
    component: SignInComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [authenticationGuard],
    data: {
      role: "admin",
    },
    children: [
      {
        path: "internship-management",
        component: IntershipManagementComponent,
        data: {
          name: 'Internship management',
        },
      },
      {
        path: "document-management",
        component: DocumentManagementComponent,
        data: {
          name: 'Document management',
        },
      },
      {
        path: "report-management",
        component: ReportManagementComponent,
        data: {
          name: 'Report management',
        },
      },
      {
        path: "report-schedule-management",
        component: ReportScheduleManagementComponent,
        data: {
          name: 'Report schedule management',
        },
      },
      {
        path: "setting",
        component: SettingComponent,
        data: {
          name: 'Setting',
        },
      },
    ],
  },
  {
    path: "student",
    component: StudentComponent,
    canActivate: [authenticationGuard],
    data: {
        role: "student",
      },
    children: [
      {
        path: "information",
        component: InformationComponent,
        data: {
          name: "Information",
          icon: "dashboard"
        }
      },
      {
        path: "submission",
        component: SubmissionComponent,
        data: {
          name: "Submission",
          icon: "description"
        }
      },
      {
        path: "seminar-invitation",
        component: SeminarInvitationComponent,
        data: {
          name: "Seminar",
          icon: "event"
        }
      },
      {
        path: "internship-result",
        component: IntershipResultComponent,
        data: {
          name: "Result",
          icon: "assessment"
        }
      },
    ],
  },
  {
    path: "teacher",
    component: LecturerComponent,
    data: {
        role: "teacher",
      },
    children: [
      {
        path: "lecturer-internship-management",
        component: LecturerInternshipManagementComponent,
        data: {
          name: 'Internship Management'
        }
      },
      {
        path: "lecturer-internship-report",
        component: LecturerInternshipReportComponent,
        data: {
          name: 'Internship Report'
        }
      },
      {
        path: "lecturer-internship-score",
        component: LecturerInternshipScoreComponent,
        data: {
          name: 'Internship Score'
        }
      },
    ],
  },
  { path: '**', component: NotFoundComponent }
];
