import {AfterViewInit, Component, effect, signal, ViewChild} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { AuthenticationService, InternshipClassService } from "../../../services";
import { HttpClient } from "@angular/common/http";
import { Class } from "../../../models/class";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DialogCreateClassComponent } from "../../../components/dialog-create-class/dialog-create-class.component";
import {MatDialog} from "@angular/material/dialog";
import moment from "moment/moment";
import {DialogDocumentClassComponent} from "../../../components/dialog-document-class/dialog-document-class.component";

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
  selector: 'app-document-management',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './document-management.component.html',
  styleUrl: './document-management.component.scss'
})
export class DocumentManagementComponent implements AfterViewInit{
  classList: Class[] = [];
  page = signal(0);
  pageSize = signal(10)
  total = signal(200)
  cursor = signal('')
  major = "";
  company = "";
  internId = signal(0);
  params = signal(this.activatedRoute.queryParams)
  constructor(
      private authService: AuthenticationService,
      private http: HttpClient,
      private InternshipClassService: InternshipClassService,
      public dialog: MatDialog,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) {
    effect(() => {
      console.log("this.internId()", this.internId())
    })
  }
  displayedColumns: string[] = [
    "id",
    // "course",
    "code",
    "name",
    // "group",
    "status",
    "start_date",
    // "end_date",
    "action"
  ];
  dataSource = new MatTableDataSource<Props>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  getClasses = () => {
    const defaultParams = {
      page: this.page(),
      page_size: this.pageSize()
    }
    const haveCursor = { ...defaultParams, cursor: this.cursor() }
    const params = this.cursor() ? haveCursor : defaultParams
    this.InternshipClassService.getClassList(params).subscribe((data) => {
      this.classList = data.data.data;
      this.cursor.set(data.data.next_cursor)
    })
  }
  ngAfterViewInit() {
    this.getClasses();
  }
  handleChangePage(event: any) {
    this.total.set(event.length);
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getClasses();
  }
  openCreateClassDialog() {
    const dialogRef = this.dialog.open(DialogCreateClassComponent, {
      width: '1200px',
      data: { name: '', code: '', major: '', course: '', status: '', start_date: '', end_date: '', module_id: '' }
    })

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`)
    })
  }
  goToDetailClass(intern: any) {
    this.internId.set(intern.id);
    const dialogRef = this.dialog.open(DialogCreateClassComponent, {
      width: '1200px',
      data: { ...intern, module_id: intern.data.module_id }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`)
    })
  }
  goToDocumentClass(intern: any) {
    this.internId.set(intern.id);
    const dialogRef = this.dialog.open(DialogDocumentClassComponent, {
      width: '1200px',
      data: { ...intern, module_id: intern.data.module_id }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`)
    })
  }

  protected readonly moment = moment;
}
