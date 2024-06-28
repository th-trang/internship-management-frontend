import { Component, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatTable, MatTableModule } from "@angular/material/table";
import { AuthenticationService } from "../../services";
import { AvatarComponent } from './avatar/avatar.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';

export type User = {
    name: string;
    email: string;
    studentId: string;
    gender: string;
    phoneNumber: string;
    nationality: string;
    dateOfBirth: string;
}
export type Field = {
    key: string;
    label: string;
}
@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        NgForOf,
        RouterLink,
        RouterLinkActive,
        MatCardModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatTableModule,
        ReactiveFormsModule,
        NgIf,
        AvatarComponent,
        MatRadioModule, 
        MatDatepickerModule, 
        MatDividerModule
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss', 
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ProfileComponent
        },
    ]
})
export class ProfileComponent implements OnInit {
    public profileForm: FormGroup;
    isDisabled: boolean = true;

    constructor(private authService: AuthenticationService) {
        this.profileForm = new FormGroup({
            name: new FormControl({ value: "", disabled: true }, [Validators.required]),
            email: new FormControl({ value: "", disabled: true }, [Validators.required]),
            studentId: new FormControl({ value: "", disabled: true }, [Validators.required]),
            phoneNumber: new FormControl({ value: "", disabled: true }, [Validators.required]),
            nationality: new FormControl({ value: "", disabled: true }, [Validators.required]),
            gender: new FormControl({ value: "", disabled: true }, [Validators.required]),
            dateOfBirth: new FormControl({ value: "", disabled: true }, [Validators.required]),
        });
    }

    user: User = {
        name: "",
        email: "",
        studentId: "",
        phoneNumber: "",
        nationality: "",
        gender: "",
        dateOfBirth: "",
    };

    displayedFields: Field[] = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phoneNumber", label: "Phone" },
        { key: "nationality", label: "Nationality" },
        { key: "gender", label: "Gender" },
        { key: "dateOfBirth", label: "Date of birth" },
    ];

    ngOnInit() {
        this.getUserProfile()
    }


    enableEdit() {
        this.isDisabled = !this.isDisabled;
        this.displayedFields.forEach((field) => {
            this.profileForm.get(field.key)?.enable();
        });
    }
    save() {
        const payload = this.profileForm.value
        this.authService.saveUserInfo(payload).subscribe(result => {
            console.log(result);
        });
    }

    cancel() {
        this.isDisabled = !this.isDisabled;
        this.displayedFields.forEach((field) => {
            this.profileForm.get(field.key)?.disable();
        });
    }

    getUserProfile() {
        this.authService.getUserInfo().subscribe((profile) => {
            // console.log(profile);
            this.profileForm.patchValue(profile.data);
        })
    }
}


