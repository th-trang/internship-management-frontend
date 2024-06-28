import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { StorageService } from "../../services/storage.service";
import { User } from "../../models";
import { MatSnackBar } from '@angular/material/snack-bar';

type LoginResponse = {
  data: {
    access_token: string;
    refresh_token: string;
    user_info: User;
    role_id: number;
    role_name: string;
  };
  meta: {
    code: number;
    message: string;
  };
}

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
})
export class SignInComponent {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storageService: StorageService,
    private _snackBar: MatSnackBar,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
  getMe() {
    this.storageService.saveUser({ id: 1, username: "admin" });
    this.router.navigate(["/"]);
    this.authService.getUserInfo().subscribe((response) => {
      const { data, meta } = response;
      if (meta.code === 200 && data) {
        this.storageService.saveUser(data);
      }
    });
  }
  navigateByRole(roleName: string) {
    const childRoute = roleName === 'teacher' ? 'lecturer-internship-management' : roleName === 'student' ? 'information' : 'internship-management'
    this.router.navigate([`/${roleName}/${childRoute}`]);
  }
  setDataAndNavigate(data: any) {
    window.localStorage.setItem("access_token", data.access_token);
    window.localStorage.setItem("refresh_token", data.refresh_token);
    window.localStorage.setItem("ROLE", data.role_name);
    this.storageService.saveUser({ ...data.user_info, role_name: data.role_name, role_id: data.role_id });
    this.navigateByRole(data.role_name)
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((response: LoginResponse) => {
        const { data, meta } = response;
        if (meta.code === 200 && data?.access_token) {
          this.setDataAndNavigate(data)
        } else {
          this._snackBar.open("Wrong credentials, please try again", "Dismiss", {
            duration: 1000
          })
          return;
        }
      });
    }
  }
}
