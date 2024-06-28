import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
const REPORT_PATH = '/report'

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private api: ApiService) { }

  getReportById(id: string): Observable<any> { 
    return this.api.get(
      `${REPORT_PATH}/${id}`, {}
    )
  }

  uploadReport(payload: FormData): Observable<any> { 
    return this.api.post(
      `${REPORT_PATH}`, { payload }
    )
  }

  downloadReport(refId: string): Observable<any> {
    return this.api.get(
      `${REPORT_PATH}/${refId}/download`, {}
    )
  }
}
