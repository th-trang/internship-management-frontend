import { CommonModule, Time } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  MatSlideToggleModule  } from '@angular/material/slide-toggle';
import { StudentService } from '../../../services/student.service';
import { TimeConvertPipe } from '../../../pipes/time-convert.pipe';

@Component({
  selector: 'app-seminar-invitation',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    TimeConvertPipe
  ],
  templateUrl: './seminar-invitation.component.html',
  styleUrl: './seminar-invitation.component.scss'
})
export class SeminarInvitationComponent implements OnInit{

  allStepsApproved: boolean = false; //set this to true when all steps are approved
  isDateSettled: boolean = false; //set this to true when seminar date is settled
  location: any = signal('');
  room: any = signal('');
  duration: any = signal('');
  start_date: any = signal('');
  end_date: any = signal('');
  date: any = signal('');
  examiner1: any = signal('');
  // examiner2: any = signal(''); in case there are two examiners
  isAttended: boolean = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.onAttend()
  }
  
  //testing function only to prove the work flow of the mat-card(s)
  //this function will be removed in the final version
  onStepsCompleted() {
    this.allStepsApproved = !this.allStepsApproved;
  }

  //testing function only to prove the work flow of the mat-card(s)
  //this function will be removed in the final version
  isSettled() {
    this.isDateSettled = !this.isDateSettled;
    this.studentService.getStudentMeeting('1').subscribe((res) => {
      this.location.set(res.data.building);
      this.room.set(res.data.room);
      this.examiner1.set(res.data.teacher);
      this.date.set(res.data.start_date);
      this.start_date.set(res.data.start_date);
      this.end_date.set(res.data.end_date);
    });
  }

  onAttend() {
    this.isAttended = !this.isAttended;
  }
}