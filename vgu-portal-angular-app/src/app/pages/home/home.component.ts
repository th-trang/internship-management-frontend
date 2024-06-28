import {AfterViewInit, Component, effect, signal, ViewChild, ViewEncapsulation} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import { NgForOf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { AuthenticationService, InternshipClassService } from "../../services";
import { HttpClient } from "@angular/common/http";
import { Class } from "../../models/class";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DialogCreateClassComponent } from "../../components/dialog-create-class/dialog-create-class.component";
import {MatDialog} from "@angular/material/dialog";
import moment from "moment";

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
export interface IClass {

}
const ELEMENT_DATA: Props[] = [];
@Component({
  selector: "app-home",
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTableModule, MatPaginatorModule, RouterLink, RouterLinkActive, NgForOf, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements AfterViewInit {
  userInfo: any = null;
  classList: Class[] = [];
  page = signal(0);
  pageSize = signal(10)
  total = signal(200)
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
      console.log("this.params()", this.params())
    })
  }
  displayedColumns: string[] = [
    "id",
    // "major",
    // "course",
    "code",
    "name",
    "status",
    "start_date",
    "end_date",
  ];
  dataSource = new MatTableDataSource<Props>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  getClasses = () => {
    const params = {
      page: this.page() + 1,
      page_size: this.pageSize(),
      major: this.major || undefined,
      company: this.company || undefined,
    }
    this.InternshipClassService.getClassList(params).subscribe((data) => {
      this.classList = data.data.data;
      console.log(data.data.data)
    })
  }
  ngAfterViewInit() {
    this.getClasses();
    // this.dataSource.paginator = this.paginator;
    this.authService.user$.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });
  }
  handleChangePage(event: any) {
    console.log("handleChangePage", event)
    this.total.set(event.length);
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getClasses();
  }
  openCreateClassDialog() {
    const dialogRef = this.dialog.open(DialogCreateClassComponent, {
        width: '1200px',
        data: { name: '', code: '', major: '', course: '', status: '', startDate: '', endDate: '' }
    })

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`)
    })
  }
  goToDetailClass(id: number) {
    console.log("goToDetailClass", id)
    this.internId.set(id);
    this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParams: { id: id },
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
  }

  protected readonly moment = moment;
}
