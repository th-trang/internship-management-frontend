import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ApiService } from "../api.service";
import Swal from "sweetalert2";

const CLASS_PATH = "/class";
const ENROLL_PATH = "/student/enrollable";
const ASSIGNMENT_PATH = "/assignment";
const MEETING_PATH = "/meeting";
const EVALAUTE = "/evaluate";
const MAJOR = "/major";
@Injectable({
  providedIn: "root",
})
export class InternshipClassService {
  constructor(private api: ApiService) {}

  private endpoint = `${CLASS_PATH}`;
  getClassList(payload: {
    page_size: number;
    page?: string | number;
  }): Observable<any> {
    return this.api.get(this.endpoint, payload);
  }
  createClass(payload: {
    name: string;
    code: string;
    major: string;
    course: string;
    status: string;
    startDate: string;
    endDate: string;
  }): Observable<any> {
    return this.api.post(this.endpoint, payload).pipe(
      catchError((err) => {
        Swal.fire({
          icon: "error",
          title: err.error.meta.status,
          text: err.error.meta.message.toString().toUpperCase(),
        });
        throw err;
      })
    );
  }

  getDetailClass(classId: string): Observable<any> {
    const path = `${this.endpoint}/${classId}`;
    return this.api.get(path, {});
  }
  enrollClass(classId: string): Observable<any> {
    const path = `${ENROLL_PATH}`;
    return this.api.get(path, {classId: classId});
  }

  assignmentClass(classId: string): Observable<any> {
    const path = `${this.endpoint}${classId}${ASSIGNMENT_PATH}`;
    return this.api.post(path, {});
  }

  meetingClass(classId: string): Observable<any> {
    const path = `${this.endpoint}${classId}${MEETING_PATH}`;
    return this.api.post(path, {});
  }

  getMajors(): Observable<any> {
    const path = `${MAJOR}`;
    return this.api.get(path, {});
  }

  evaluateClass(payload: { classId: any; scores: any }): Observable<any> {
    const path = `${this.endpoint}/${payload.classId}${EVALAUTE}`;
    return this.api.post(path, payload.scores).pipe(
      catchError((err) => {
        Swal.fire({
          icon: "error",
          title: err?.error?.meta?.status,
          text: err?.message || err?.error?.meta?.message?.toString().toUpperCase(),
        });
        throw err;
      }));
  }

  uploadReport(payload: any): Observable<any> {
    return this.api.post(`/report`, payload);
  }
}
