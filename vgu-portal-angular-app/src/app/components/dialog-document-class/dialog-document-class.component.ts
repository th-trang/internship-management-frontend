import {Component, Inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {InternshipClassService} from "../../services";
import moment from "moment";
import {GROUPS, LECTURERS} from "../../constants/internship";
import Swal from 'sweetalert2'
import {MatIconModule} from "@angular/material/icon";
import {CdkDragPlaceholder} from "@angular/cdk/drag-drop";
import {MatProgressBarModule} from "@angular/material/progress-bar";

export type Field = {
    key: string;
    label: string;
    required: boolean;
    type?: string;
    placeholder?: string;
    dropdown?: any[]
}
@Component({
  selector: 'app-dialog-document-class',
  standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatIconModule,
        CdkDragPlaceholder,
        MatProgressBarModule
    ],
    providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './dialog-document-class.component.html',
  styleUrl: './dialog-create-class.component.scss'
})
export class DialogDocumentClassComponent implements OnInit{
    public newClassForm: FormGroup;
    class: any = signal('')
    downloading: any = signal(false)
    constructor(private dateAdapter: DateAdapter<any>, private internshipClassService: InternshipClassService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogDocumentClassComponent>) {
        this.newClassForm = new FormGroup({
            filename: new FormControl({ value: "filename.pdf", disabled: false }, [Validators.required]),
            enable: new FormControl({ value: false, disabled: false }, [Validators.required]),
            status: new FormControl({ value: false, disabled: false }, [Validators.required]),
            end_date: new FormControl({ value: "", disabled: false }, [Validators.required]),
        });
    }
    ngOnInit() {
        if (this.data) {
            const internship = this.data
            this.class.set(internship.name)
        }
    }

    save() {
        const isFormValid = this.newClassForm.valid;
        if (!isFormValid) {
            Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "Please fill all required fields!",
            });
            this.newClassForm.markAllAsTouched();
            return;
        }
        try {
            this.internshipClassService.createClass(this.newClassForm.value).subscribe((res) => {
                if (res.meta.code === 200) {
                    this.dialogRef.close()
                    this.data = null
                }
            });
        }
        catch (e) {
            console.log(e)
        }
    }
    enableDocument() {
        this.newClassForm.controls['enable'].setValue(!this.newClassForm.value.enable)
    }
    downloadDocument() {
        this.downloading.set(true)
        setTimeout(() => {
            this.downloading.set(false)
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Download file success!"
            })
        }, 1000)
    }
}
