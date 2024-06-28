import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgForOf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SelectionModel } from "@angular/cdk/collections";

export interface Props {
    id: number;
    major: string;
    course: string;
    status: string;
    startDate: string;
    endDate: string;
}

const ELEMENT_DATA: Props[] = [
    {
        id: 1,
        major: "Computer Science",
        course: "Introduction to Programming",
        status: "Enrolled",
        startDate: "2023-01-01",
        endDate: "2023-05-01",
    },
    {
        id: 2,
        major: "Data Science",
        course: "Machine Learning",
        status: "Completed",
        startDate: "2022-08-01",
        endDate: "2022-12-01",
    },
    {
        id: 3,
        major: "Web Development",
        course: "Full Stack Development",
        status: "In Progress",
        startDate: "2023-03-01",
        endDate: "2023-07-01",
    },
    {
        id: 1,
        major: "Computer Science",
        course: "Introduction to Programming",
        status: "Enrolled",
        startDate: "2023-01-01",
        endDate: "2023-05-01",
    },
    {
        id: 2,
        major: "Data Science",
        course: "Machine Learning",
        status: "Completed",
        startDate: "2022-08-01",
        endDate: "2022-12-01",
    },
    {
        id: 3,
        major: "Web Development",
        course: "Full Stack Development",
        status: "In Progress",
        startDate: "2023-03-01",
        endDate: "2023-07-01",
    },
    {
        id: 1,
        major: "Computer Science",
        course: "Introduction to Programming",
        status: "Enrolled",
        startDate: "2023-01-01",
        endDate: "2023-05-01",
    },
    {
        id: 2,
        major: "Data Science",
        course: "Machine Learning",
        status: "Completed",
        startDate: "2022-08-01",
        endDate: "2022-12-01",
    },
    {
        id: 3,
        major: "Web Development",
        course: "Full Stack Development",
        status: "In Progress",
        startDate: "2023-03-01",
        endDate: "2023-07-01",
    },
    {
        id: 1,
        major: "Computer Science",
        course: "Introduction to Programming",
        status: "Enrolled",
        startDate: "2023-01-01",
        endDate: "2023-05-01",
    },
    {
        id: 2,
        major: "Data Science",
        course: "Machine Learning",
        status: "Completed",
        startDate: "2022-08-01",
        endDate: "2022-12-01",
    },
    {
        id: 3,
        major: "Web Development",
        course: "Full Stack Development",
        status: "In Progress",
        startDate: "2023-03-01",
        endDate: "2023-07-01",
    },
    {
        id: 1,
        major: "Computer Science",
        course: "Introduction to Programming",
        status: "Enrolled",
        startDate: "2023-01-01",
        endDate: "2023-05-01",
    },
    {
        id: 2,
        major: "Data Science",
        course: "Machine Learning",
        status: "Completed",
        startDate: "2022-08-01",
        endDate: "2022-12-01",
    },
    {
        id: 3,
        major: "Web Development",
        course: "Full Stack Development",
        status: "In Progress",
        startDate: "2023-03-01",
        endDate: "2023-07-01",
    },
    {
        id: 1,
        major: "Computer Science",
        course: "Introduction to Programming",
        status: "Enrolled",
        startDate: "2023-01-01",
        endDate: "2023-05-01",
    },
    {
        id: 2,
        major: "Data Science",
        course: "Machine Learning",
        status: "Completed",
        startDate: "2022-08-01",
        endDate: "2022-12-01",
    },
    {
        id: 3,
        major: "Web Development",
        course: "Full Stack Development",
        status: "In Progress",
        startDate: "2023-03-01",
        endDate: "2023-07-01",
    },
    {
        id: 1,
        major: "Computer Science",
        course: "Introduction to Programming",
        status: "Enrolled",
        startDate: "2023-01-01",
        endDate: "2023-05-01",
    },
    {
        id: 2,
        major: "Data Science",
        course: "Machine Learning",
        status: "Completed",
        startDate: "2022-08-01",
        endDate: "2022-12-01",
    },
    {
        id: 3,
        major: "Web Development",
        course: "Full Stack Development",
        status: "In Progress",
        startDate: "2023-03-01",
        endDate: "2023-07-01",
    },
    {
        id: 1,
        major: "Computer Science",
        course: "Introduction to Programming",
        status: "Enrolled",
        startDate: "2023-01-01",
        endDate: "2023-05-01",
    },
    {
        id: 2,
        major: "Data Science",
        course: "Machine Learning",
        status: "Completed",
        startDate: "2022-08-01",
        endDate: "2022-12-01",
    },
    {
        id: 3,
        major: "Web Development",
        course: "Full Stack Development",
        status: "In Progress",
        startDate: "2023-03-01",
        endDate: "2023-07-01",
    },
];
@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        MatSidenavModule, MatIconModule, MatTableModule, MatPaginatorModule, RouterLink, RouterLinkActive, NgForOf, MatInputModule, MatButtonModule, MatCheckboxModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements AfterViewInit {
    displayedColumns: string[] = [
        "select",
        "id",
        "major",
        "course",
        "status",
        "startDate",
        "endDate",
        "action"
    ];
    dataSource = new MatTableDataSource<Props>(ELEMENT_DATA);
    selection = new SelectionModel<Props>(true, []);

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }
    checkboxLabel(row?: Props): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
}
