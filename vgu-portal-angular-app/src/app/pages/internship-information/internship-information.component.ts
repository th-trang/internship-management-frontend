import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

export type Internship = {
    name: string;
    email: string;
    studentId: string;
    gender: string;
    phoneNumber: string;
    nationality: string;
    dateOfBirth: string;
    address: string;
}
export type Field = {
    key: string;
    label: string;
    type: string;
}
@Component({
  selector: 'app-internship-information',
  standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './internship-information.component.html',
  styleUrl: './internship-information.component.scss'
})
export class InternshipInformationComponent {
    public profileForm: FormGroup;
    isDisabled: boolean = true;
    constructor() {
        this.profileForm = new FormGroup({
            major: new FormControl({ value: "", disabled: true }, [Validators.required]),
            courseId: new FormControl({ value: "", disabled: true }, [Validators.required]),
            dateOfStart: new FormControl({ value: "", disabled: true }, [Validators.required]),
            dateOfEnd: new FormControl({ value: "", disabled: true }, [Validators.required]),
            deadlineSubmitDocument: new FormControl({ value: "", disabled: true }, [Validators.required]),
            deadlineSubmitReport: new FormControl({ value: "", disabled: true }, [Validators.required]),
            instructor: new FormControl({ value: "", disabled: true }, [Validators.required]),
            instructorEmail: new FormControl({ value: "", disabled: true }, [Validators.required]),
            instructorPhone: new FormControl({ value: "", disabled: true }, [Validators.required]),
        });
    }
    displayedFields: Field[] = [
        { key: "major", label: "Major", type: "text" },
        { key: "courseId", label: "Course Id", type: "text" },
        { key: "dateOfStart", label: "Date Of Start", type: "date" },
        { key: "dateOfEnd", label: "Date Of End", type: "date" },
        { key: "deadlineSubmitDocument", label: "Deadline Submit Document", type: "date" },
        { key: "deadlineSubmitReport", label: "Deadline Submit Report", type: "date" },
        { key: "instructor", label: "Instructor", type: "text" },
        { key: "instructorEmail", label: "Instructor Email", type: "text" },
        { key: "instructorPhone", label: "Instructor Phone", type: "text" },
    ];
}
