// api.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import {buildUrl} from "../helpers/buildUrl";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  private setHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Lấy token từ AuthService hoặc nơi khác
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public get<T>(endpoint: string, params?: any): Observable<T> {
    const url = `${buildUrl(endpoint)}`;
    const headers = this.setHeaders();

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<T>(url, { headers, params: httpParams });
  }

  public post<T>(endpoint: string, payload: any): Observable<T> {
    const url = `${buildUrl(endpoint)}`;
    const headers = this.setHeaders();

    return this.http.post<T>(url, payload, { headers });
  }

  public put<T>(endpoint: string, payload: any): Observable<T> {
    const url = `${buildUrl(endpoint)}`;
    const headers = this.setHeaders();

    return this.http.put<T>(url, payload, { headers });
  }

}
