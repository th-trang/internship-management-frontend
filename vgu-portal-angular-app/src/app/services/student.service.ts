
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
const STUDEN_PATH = '/student'


@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(private api: ApiService) { }

  getStudent(payload: { page_size: number, page?: string | number }): Observable<any> { 
    return this.api.get(
      `${STUDEN_PATH}`, { payload }
    )
  }

  getStudentById(id: string): Observable<any> { 
    return this.api.get(
      `${STUDEN_PATH}/${id}`
    )
  }

  updateStudent(payload: FormData): Observable<any> { 
    return this.api.post(
      `${STUDEN_PATH}`, { payload }
    )
  }

  getStudentMeeting(id: string): Observable<any> { 
    return this.api.get(
      `${STUDEN_PATH}/${id}/meeting`
    )
  }

}
