import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

export type Criteria = {
  label: string;
  key: string;
  value: number;
}

@Component({
  selector: 'app-intership-result',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule
  ],
  templateUrl: './intership-result.component.html',
  styleUrl: './intership-result.component.scss'
})
export class IntershipResultComponent implements OnInit{

  isAttended: boolean = false; //change this to true when user click attend button in seminar-invitation-card
  graded: boolean = false; //change this to true when lecturer has graded the seminar
  criteria1: any = signal('');
  criteria2: any = signal('');
  criteria3: any = signal('');

  finalGrade: Criteria[] =[
    {label: 'Criteria 1', key: 'criteria1', value: this.criteria1},
    {label: 'Criteria 2', key: 'criteria2', value: this.criteria2},
    {label: 'Criteria 3', key: 'criteria3', value: this.criteria3}
  ]

  ngOnInit(): void {

  }

  //testing function only to prove the work flow of the mat-card(s)
  //this function will be removed in the final version
  onAttend() {
    this.isAttended = !this.isAttended;
  }

  onGradeStatus() {
    this.graded = !this.graded;
  }
}
