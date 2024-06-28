import {Component, ViewEncapsulation} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { NgForOf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: "app-index",
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTableModule, MatPaginatorModule, RouterLink, RouterLinkActive, NgForOf, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./index.component.html",
  styleUrl: "./index.component.scss",
  encapsulation: ViewEncapsulation.None
})

export class IndexComponent {
  
  constructor(
      
  ) {
  }
  
}
