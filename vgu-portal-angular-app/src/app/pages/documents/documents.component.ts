import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InternshipClassService} from "../../services";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-documents',
  standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule
    ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {
    constructor(private route: ActivatedRoute, private internshipClassService: InternshipClassService) {}
    classDetail = signal({
        name: '',
        code: '',
    })
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.internshipClassService.getDetailClass(params['id']).subscribe((res) => {
            console.log(res);
            this.classDetail.set(res.data)
        });
      })

        // throw new Error('Method not implemented.');
    }
}
