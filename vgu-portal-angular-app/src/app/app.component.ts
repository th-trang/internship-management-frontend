import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
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