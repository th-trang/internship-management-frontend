import { Component, ViewChild, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import moment from "moment/moment";
import { InternshipClassService } from "../../../services";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-lecturer-internship-score",
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./lecturer-internship-score.component.html",
  styleUrl: "./lecturer-internship-score.component.scss",
})
export class LecturerInternshipScoreComponent {
  protected readonly moment = moment;

  cursor = signal("");
  page = signal(0);
  page_size = 10;
  dataSource = new MatTableDataSource<any>();
  major = "";
  company = "";
  classInfo: any;
  students = [];
  classId = "";
  constructor(
    private internshipClass: InternshipClassService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams) => (this.classId = queryParams["classId"])
    );
    this.getDataList(this.classId);
  }

  displayedColumns: string[] = [
    "no",
    "major",
    "course",
    "student",
    "score",
    "comment",
    // "action",
  ];

  VForm = this.fb.group({
    id: [""],
    students: this.fb.array([]),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  submitScore() {
    console.log(this.VForm.value);
    const formData = this.VForm.value;
    const payload = {
      classId: formData.id,
      scores: formData.students,
    }
    this.internshipClass.evaluateClass(payload).subscribe(res => {
      console.log(res);
    });
  }

  getDataList(classId: string) {
    this.internshipClass.getDetailClass(classId).subscribe((result) => {
      this.classInfo = result.data;
      this.students = this.students.concat(result.data.students);
      this.VForm.patchValue(result.data);
      const studentsForm = this.VForm.get('students') as FormArray;
      result.data.students.forEach((student: any) => {
        studentsForm.push(
          this.fb.group({
            student_id: [student.id],
            score: [student.score],
            comment: [student.comment],
          })
        );
      });
      console.log(this.VForm.value);
      if (result.data.next_cursor) {
        this.page.set(this.page() + 1);
      }
    });
  }

  
}
