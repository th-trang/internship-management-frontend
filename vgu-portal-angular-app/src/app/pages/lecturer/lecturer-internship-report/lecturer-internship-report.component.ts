import { Component, ViewChild, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import moment from "moment/moment";
import { InternshipClassService } from "../../../services";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-lecturer-intership-report",
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: "./lecturer-internship-report.component.html",
  styleUrl: "./lecturer-internship-report.component.scss",
})
export class LecturerInternshipReportComponent {
  protected readonly moment = moment;


  cursor = signal("");
  page = signal(0);
  page_size = 10;
  dataSource = new MatTableDataSource<any>();
  major = "";
  company = "";
  dataList = [];
  classId = "";
  constructor(
    private internshipClass: InternshipClassService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams =>
      this.classId = queryParams['classId']
  )
    // this.getDataList(this.classId);
  }
  displayedColumns: string[] = [
    "id",
    "major",
    "room",
    "lecture",
    "dateReport",
    "time",
    "group",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  // getDataList(classId: string) {
  // this.internshipClass.getClassList(classId).subscribe((result) => {
  //     this.dataList = this.dataList.concat(result.data.students);
  //     if(result.data.next_cursor) {
  //        this.page.set(this.page() + 1);
  //     }
  // })
  // }
}
