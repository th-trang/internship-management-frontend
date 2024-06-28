import {effect, Injectable, signal} from '@angular/core';
import { USER_INFO_KEY } from '../constants';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public localStorage = window.localStorage;
  public user = signal({ role_id: '', role_name: ''});

  constructor() {
    effect(() => {
      console.log("user", this.user())
    })
  }

  private userSubject = new BehaviorSubject<any>(null);
  clean(): void {
    window.localStorage.clear();
    this.user.set({ role_id: '', role_name: ''})
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_INFO_KEY);
    window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
    this.user.set(user);
  }
  public getUser(): any {
    const user = window.localStorage.getItem(USER_INFO_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_INFO_KEY);
    if (user) {
      return true;
    }
    return false;
  }


}