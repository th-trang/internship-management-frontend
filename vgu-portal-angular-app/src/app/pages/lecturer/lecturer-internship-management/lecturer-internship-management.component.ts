import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { InternshipClassService } from "../../../services";
import { FormsModule } from "@angular/forms";
import { DialogCreateClassComponent } from "../../../components/dialog-create-class/dialog-create-class.component";
import { MatDialog } from "@angular/material/dialog";
import moment from "moment/moment";
import { Router } from "@angular/router";

export interface Props {
  id: number;
  code: string;
  name: string;
  major: string;
  course: string;
  status: string;
  start_date: string;
  end_date: string;
}

@Component({
  selector: "app-lecturer-intership-management",
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: "./lecturer-internship-management.component.html",
  styleUrl: "./lecturer-internship-management.component.scss",
})
export class LecturerInternshipManagementComponent implements OnInit {
  cursor = signal("");
  page = signal(0);
  page_size = 10;
  dataSource = new MatTableDataSource<any>();
  major = "";
  company = "";
  classList = [];
  constructor(
    private InternshipClassService: InternshipClassService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getClasses();
  }
  displayedColumns: string[] = [
    "id",
    "major",
    // "course",
    //"code",
    "name",
    //"group",
    "status",
    "start_date",
    "end_date",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  getClasses = () => {
    const payload = {
      page_size: this.page_size,
      page: this.page(),
    };

    this.InternshipClassService.getClassList(payload).subscribe((result) => {
      this.classList = this.classList.concat(result.data.data);
      if (result.data.next_cursor) {
        this.page.set(this.page() + 1);
      }
    });
  };

  openCreateClassDialog() {
    const dialogRef = this.dialog.open(DialogCreateClassComponent, {
      width: "1200px",
      data: {
        name: "",
        code: "",
        major: "",
        course: "",
        status: "",
        start_date: "",
        end_date: "",
        module_id: "",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`)
    });
  }
  goToDetailClass(classId: string) {
    this.router.navigate([
      "teacher/lecturer-internship-score" ],
      { queryParams: { classId: classId } });
    // const dialogRef = this.dialog.open(DialogCreateClassComponent, {
    //     width: '1200px',
    //     data: { ...intern, module_id: intern.data.module_id }
    // })
    // dialogRef.afterClosed().subscribe(result => {
    //     // console.log(`Dialog result: ${result}`)
    // })
  }

  onTableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 300;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit && this.cursor() !== "") {
      this.getClasses();
    }
  }

  protected readonly moment = moment;
}
