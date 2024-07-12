import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { APP_NAME } from "./constants";
import { StudentComponent } from "./pages/student/student.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { LecturerComponent } from "./pages/lecturer/lecturer.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    StudentComponent,
    AdminComponent,
    LecturerComponent
  ]
})
export class AppComponent {
}