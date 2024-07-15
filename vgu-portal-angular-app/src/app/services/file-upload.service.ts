import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private API_URL = environment.API_URL;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('files', file, file.name);

    const req = new HttpRequest('POST', `${this.API_URL}/internship/v1/report`, formData, {
      reportProgress: true,
    });

    return this.httpClient.request(req);
  }
}
