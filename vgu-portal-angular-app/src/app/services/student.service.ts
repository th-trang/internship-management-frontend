
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
const STUDENT_PATH = '/student'


@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(private api: ApiService) { }

  getStudent(payload: { page_size: number, page?: string | number }): Observable<any> { 
    return this.api.get(
      `${STUDENT_PATH}`, { payload }
    )
  }

  getStudentById(id: string): Observable<any> { 
    return this.api.get(
      `${STUDENT_PATH}/${id}`
    )
  }

  updateStudent(payload: FormData): Observable<any> { 
    return this.api.post(
      `${STUDENT_PATH}`, { payload }
    )
  }

  getStudentMeeting(id: string): Observable<any> { 
    return this.api.get(
      `${STUDENT_PATH}/${id}/meeting`
    )
  }

}
