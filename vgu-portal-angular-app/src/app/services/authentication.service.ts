import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { buildUrl } from "../helpers/buildUrl";
import { StorageService } from "./storage.service";
import { ApiService } from "./api.service";

const AUTH_PATH = "/auth";
const LOG_IN = "/login";
const SIGN_OUT = "/signout";
const SIGN_UP = "/logout";
const USER_INFO = "/user";
const REFRESH = "/refresh";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private api: ApiService
  ) {}

  private userSubject = new BehaviorSubject<any>(null);
  private tokenSubject = new BehaviorSubject<any>(null);
  private roleAs: string | undefined | null;

  user$ = this.userSubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  login(payload: { username: string; password: string }): Observable<any> {
    return this.http.post(buildUrl(AUTH_PATH + LOG_IN), {
      username: payload.username,
      password: payload.password,
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      buildUrl(AUTH_PATH + SIGN_UP),
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    window.localStorage.clear();
    return this.http.post(buildUrl(AUTH_PATH + SIGN_OUT), {}, httpOptions);
  }

  getUserInfo(): Observable<any> {
    return this.api.get(USER_INFO);
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  refreshToken(refresh_token: string) {
    return this.http.post(
      buildUrl(REFRESH),
      {
        refresh_token,
      },
      httpOptions
    );
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem("access_token");
    if (user) {
      return true;
    }

    return false;
  }

  getRole() {
    this.roleAs = localStorage.getItem("ROLE");
    return this.roleAs;
  }

  saveUserInfo(payload: any): Observable<any> {
    return this.api.put(USER_INFO, payload);
  }
}
