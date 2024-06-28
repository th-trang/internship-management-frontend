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
    room: string;
    lecture: string;
    dateOfReport: string;
    time: string;
    groupOfStudent: string,
}

const ELEMENT_DATA: Props[] = [
    {
        id: 1,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-01-01",
        time: "10 AM",
        groupOfStudent: "Group 2",
    },
    {
        id: 2,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-01-04",
        time: "10 AM",
        groupOfStudent: "Group 2",
    },
    {
        id: 3,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-01-08",
        time: "10 AM",
        groupOfStudent: "Group 1",
    },
    {
        id: 4,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-01-12",
        time: "10 AM",
        groupOfStudent: "Group 1",
    },
    {
        id: 5,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-01-16",
        time: "10 AM",
        groupOfStudent: "Group 1",
    },
    {
        id: 6,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-01-20",
        time: "10 AM",
        groupOfStudent: "Group 1",
    },
    {
        id: 7,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-01-24",
        time: "10 AM",
        groupOfStudent: "Group 1",
    },
    {
        id: 8,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-01-28",
        time: "10 AM",
        groupOfStudent: "Group 1",
    },
    {
        id: 9,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-02-02",
        time: "10 AM",
        groupOfStudent: "Group 2",
    },
    {
        id: 10,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-02-06",
        time: "10 AM",
        groupOfStudent: "Group 2",
    },
    {
        id: 11,
        major: "Computer Science",
        room: "VIP 1",
        lecture: "Enrolled",
        dateOfReport: "2023-02-10",
        time: "10 AM",
        groupOfStudent: "Group 2",
    },
];
@Component({
    selector: "app-report",
    standalone: true,
    imports: [MatSidenavModule, MatIconModule, MatTableModule, MatPaginatorModule, RouterLink, RouterLinkActive, NgForOf, MatInputModule, MatButtonModule],
    templateUrl: "./report.component.html",
    styleUrl: "./report.component.scss",
})

export class ReportComponent implements AfterViewInit {
    displayedColumns: string[] = [
        "id",
        "major",
        "room",
        "lecture",
        "dateOfReport",
        "time",
        "groupOfStudent"
    ];
    dataSource = new MatTableDataSource<Props>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}
