import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { SeminarInvitationComponent } from '../seminar-invitation/seminar-invitation.component';

@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    UploadFileComponent,
    HttpClientModule,
    SeminarInvitationComponent
  ],
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.scss'
})
export class SubmissionComponent implements OnInit {

  isLinear: boolean = false;
  isStepOneApproved: boolean = false;   //set this to true when the first step is approved
  isStepTwoApproved: boolean = false;   //set this to true when the second step is approved
  isStepThreeApproved: boolean = false; //set this to true when the third step is approved
  isStepFourApproved: boolean = false;  //set this to true when the fourth step is approved


  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClientModule) {

  }
  ngOnInit(): void {

  }

  allStepsApproved(): any {
  
  }

  firstFormGroup = this._formBuilder.group({

  });

  secondFormGroup = this._formBuilder.group({

  });

  thirdFormGroup = this._formBuilder.group({

  });

  forthFormGroup = this._formBuilder.group({

  });

  onSubmit() {

  }
}
