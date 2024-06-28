import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private API_URL = environment.API_URL;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const option = {
      reportProgress: true,
    };

    const req = new HttpRequest('POST', `{this.API_URL}/report`, formData, option)
    return this.httpClient.request(req);
    }
}
