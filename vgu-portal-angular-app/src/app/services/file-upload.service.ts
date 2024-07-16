import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private api: ApiService,
  ) { }

  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('files', file, file.name);

    return this.api.post('/report', formData);
  }
}
