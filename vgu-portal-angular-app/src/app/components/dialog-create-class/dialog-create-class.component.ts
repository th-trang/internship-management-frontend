import { Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgForOf, NgIf } from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DateAdapter, MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { InternshipClassService } from "../../services";
import moment from "moment";
import { GROUPS, LECTURERS } from "../../constants/internship";
import Swal from "sweetalert2";

export type Field = {
  key: string;
  label: string;
  required: boolean;
  type?: string;
  placeholder?: string;
  dropdown?: any[];
};
@Component({
  selector: "app-dialog-create-class",
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
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: "./dialog-create-class.component.html",
  styleUrl: "./dialog-create-class.component.scss",
})
export class DialogCreateClassComponent implements OnInit {
  public newClassForm: FormGroup;
  constructor(
    private dateAdapter: DateAdapter<any>,
    private internshipClassService: InternshipClassService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCreateClassComponent>
  ) {
    this.newClassForm = new FormGroup({
      name: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      code: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      start_date: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      major_id: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      end_date: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      module_id: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      module_name: new FormControl({ value: "", disabled: false }, [
        Validators.required,
    ]),
    });
  }
  textFields: Field[] = [
    { key: "name", label: "Course Name", required: true },
    { key: "module_name", label: "Module Name", required: true },
    { key: "module_id", label: "Module ID", required: true },
  ];
  dateFields: Field[] = [
    {
      key: "start_date",
      label: "Internship Date From",
      required: true,
      type: "date",
      placeholder: "From",
    },
    {
      key: "end_date",
      label: "Internship Date To",
      required: true,
      type: "date",
      placeholder: "To",
    },
  ];
  selectFields: Field[] = [
    {
      key: "major_id",
      label: "Major",
      required: true,
      type: "select",
      dropdown: [],
    },
  ];

  ngOnInit() {
    if (this.data) {
      const internshipOj = {
        name: "",
        code: "",
        start_date: "",
        end_date: "",
        module_id: "",
      };
      const internship = this.data;
      for (const item in internshipOj) {
        this.newClassForm.controls[item].setValue(internship[item]);
      }
    }

    this.internshipClassService.getMajors().subscribe((result) => {
      if (result.data.length > 0) {
        this.selectFields[0].dropdown = result.data;
      }
    });
  }

  createClass() {
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
      this.internshipClassService
        .createClass(this.newClassForm.value)
        .subscribe((res) => {
          if (res.meta.code === 200) {
            this.dialogRef.close();
            this.data = null;
          }
        });
    } catch (e) {
      console.log(e);
    }
  }
  editClass() {
    Swal.fire({
      icon: "info",
      title: "Sorry",
      text: "Functionality is building...",
    });
  }
  computeDate() {
    const date1 = moment(this.newClassForm.value?.submitDateTo);
    const date2 = this.newClassForm.value?.submitDateFro;
    const diff = moment(date1).diff(date2, "days");
    return `${diff} days`;
  }
}
