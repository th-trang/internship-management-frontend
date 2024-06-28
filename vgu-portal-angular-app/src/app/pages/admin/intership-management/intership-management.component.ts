import { Component, effect, signal, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";
import { NgForOf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  InternshipClassService,
} from "../../../services";
import { Class } from "../../../models/class";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import moment from "moment/moment";
import { MatRippleModule } from "@angular/material/core";
import Swal from "sweetalert2";
import { CreateClassComponent } from "./create-class/create-class.component";

export interface Props {
  id: number;
  code: string;
  name: string;
  data: { module_id: string };
  course: string;
  status: string;
  start_date: string;
  end_date: string;
}
@Component({
  selector: "app-intership-management",
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatRippleModule,
  ],
  templateUrl: "./intership-management.component.html",
  styleUrl: "./intership-management.component.scss",
})
export class IntershipManagementComponent {
  userInfo: any = null;
  classList: Class[] = [];
  page = signal(0);
  pageSize = signal(10);
  total = signal(200);
  cursor = signal("");
  major = "";
  company = "";
  internId = signal(0);
  params = signal(this.activatedRoute.queryParams);
  majorList: any = [];
  constructor(
    private InternshipClassService: InternshipClassService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    effect(() => {
      console.log("this.internId()", this.internId());
    });
  }
  displayedColumns: string[] = [
    "id",
    // "course",
    "code",
    "name",
    "group",
    "status",
    "start_date",
    "end_date",
    "action",
  ];
  dataSource = new MatTableDataSource<Props>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  getClasses = () => {
    const defaultParams = {
      page: this.page(),
      page_size: this.pageSize(),
    };
    const haveCursor = { ...defaultParams, cursor: this.cursor() };
    const params = this.cursor() ? haveCursor : defaultParams;

    this.InternshipClassService.getClassList(params).subscribe((data) => {
      this.classList = data.data.data;
      this.cursor.set(data.data.next_cursor);
    });
  };

  ngOnInit() {
    this.getClasses();

    this.InternshipClassService.getMajors().subscribe((result) => {
      if (result.data.length > 0) {
        this.majorList = result.data;
      }
    });
  }

  handleChangePage(event: any) {
    this.total.set(event.length);
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getClasses();
  }

  openCreateClassDialog() {
    const dialogRef = this.dialog.open(CreateClassComponent, {
      data: { majorList: this.majorList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        location.reload();
      }
    });
  }

  goToDetailClass(intern: any) {
    this.internId.set(intern.id);
    const dialogRef = this.dialog.open(CreateClassComponent, {
      data: { form: { ...intern }, majorList: this.majorList },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  DeleteClass(intern: any) {
    this.internId.set(intern.id);
    Swal.fire({
      icon: "info",
      title: "Sorry",
      text: "Functionality is building...",
    });
  }

  protected readonly moment = moment;
}
