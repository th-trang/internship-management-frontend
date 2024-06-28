import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

export interface Props {
  id: number;
  major: string;
  course: string;
  student: string;
  score: string;
  status: string;
  comment: string,
}

const ELEMENT_DATA: Props[] = [
  {
    id: 1,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van B",
    score: "3.5",
    status: "fail",
    comment: "",
  },
  {
    id: 2,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van A",
    score: "4.5",
    status: "pass",
    comment: "",
  },
  {
    id: 3,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van C",
    score: "4",
    status: "pass",
    comment: "",
  },
  {
    id: 4,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van D",
    score: "3.5",
    status: "fail",
    comment: "",
  },
  {
    id: 5,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van E",
    score: "4",
    status: "pass",
    comment: "",
  },
  {
    id: 6,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van F",
    score: "4.5",
    status: "pass",
    comment: "",
  },
  {
    id: 7,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van G",
    score: "3",
    status: "fail",
    comment: "",
  },
  {
    id: 8,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van H",
    score: "4",
    status: "pass",
    comment: "",
  },
  {
    id: 9,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van I",
    score: "4.5",
    status: "pass",
    comment: "",
  },
  {
    id: 10,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van K",
    score: "3",
    status: "fail",
    comment: "",
  },
  {
    id: 11,
    major: "Computer Science",
    course: "Intern 01.24",
    student: "Nguyen Van L",
    score: "4",
    status: "pass",
    comment: "",
  }
];
@Component({
  selector: 'app-score',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTableModule, MatPaginatorModule, RouterLink, RouterLinkActive, NgForOf, MatInputModule, MatButtonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "major",
    "course",
    "student",
    "score",
    "status",
    "comment"
  ];
  dataSource = new MatTableDataSource<Props>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
