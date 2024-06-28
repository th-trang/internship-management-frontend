import { Component, Inject } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {MatIconModule} from '@angular/material/icon';
import { InternshipClassService } from "../../../../services";

@Component({
  selector: "app-create-class",
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
    MatButtonModule,
    MatIconModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: "./create-class.component.html",
  styleUrl: "./create-class.component.scss",
})
export class CreateClassComponent {
  VForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.maxLength(255)]],
    code: ["", [Validators.required, Validators.maxLength(255)]],
    major_id: ["", [Validators.required, Validators.maxLength(255)]],
    start_date: ["", [Validators.required]],
    end_date: ["", [Validators.required]],
    module_id: [0, [Validators.required, Validators.maxLength(255)]],
    module_name: ["", [Validators.required, Validators.maxLength(255)]],
    assignments: this.fb.array([
      this.fb.group({
        name: ["", [Validators.required, Validators.maxLength(255)]],
      }),
    ]),
  });

  constructor(
    private internshipClassService: InternshipClassService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    if (this.data?.form?.id) {
      console.log(this.data?.form)
      this.VForm.patchValue(this.data.form);
      this.VForm.disable();
    }
  }

  initAssignments(): FormGroup {
    return this.fb.group({
      name: ["", [Validators.required, Validators.maxLength]],
    });
  }
  get assignmentsForm() {
    return this.VForm.get("assignments") as FormArray;
  }

  createForm() {
    const classData: any = this.VForm.value;
    this.internshipClassService.createClass(classData).subscribe(data => {
      if(data.data.id) {
        this.dialogRef.close(true);
      }
    })
  }

  updateForm() {
    const classData: any = this.VForm.value;
    console.log(classData);
  }

  addAssignment() {
    const assignments = this.VForm.controls["assignments"] as FormArray;
    assignments.push(
      this.fb.group({
        name: "",
      })
    );
    console.log(assignments);
  }

  removeAssignment(index: number) {
    const assignments = this.VForm.controls["assignments"] as FormArray;
    assignments.removeAt(index);
  }
}
