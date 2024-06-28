import { AfterViewInit, Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export type Field = {
  key: string;
  label: string;
  value: any;
}

export type Tab = {
  key: string;
  label: string;
  value: SafeHtml
}

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent implements OnInit, AfterViewInit {

  program: any = signal('');
  matNumber: any = signal('');
  status: any = signal('');
  intake: any = signal('');
  attempt: any = signal('');
  credit: any = signal('');
  sanitizedSeminarInfo: SafeHtml = signal('');
  sanitizedReportInfo: SafeHtml = signal('');
  sanitizedSteps: SafeHtml = signal('');
  background: ThemePalette;
  @ViewChild('tabGroup') tabGroup;;

  values: Field[] = [
    { key: 'major', label: 'program', value: this.program },
    { key: 'intake', label: 'intake', value: this.intake },
    { key: 'credit', label: 'credits', value: this.credit },
    { key: 'code', label: 'matriculation number', value: this.matNumber },
    { key: 'status', label: 'status', value: this.status },
    { key: 'attempt', label: 'attempt(s)', value: this.attempt }
  ];

  tabs: Tab[] = [
    { key: 'seminar', label: 'Seminar', value: this.sanitizedSeminarInfo },
    { key: 'report', label: 'Report', value: this.sanitizedReportInfo },
    { key: 'step', label: 'Steps', value: this.sanitizedSteps }
  ]

  constructor(
    private data: StudentService,
    private sanitizer: DomSanitizer,
  ) { }
  ngAfterViewInit(): void {
    console.log(this.tabGroup.selectedIndex);
  }


  ngOnInit(): void {
    this.geAcademictData();
    this.convertHTML();
  }

  tabChange(tabChangeEvent: MatTabChangeEvent){
    const background = tabChangeEvent.tab._closestTabGroup._backgroundColor = '#39a7ff'
      console.log(tabChangeEvent.tab._closestTabGroup)
      console.log(tabChangeEvent.tab._closestTabGroup._backgroundColor)
    return background;
    }

  geAcademictData(): void {
    this.data.getStudentById('1').subscribe((res) => {
      const keys = Object.keys(res.data);
      const content = Object.values(res.data);
      for (let i = 0; i < this.values.length; i++) {
        for (let j = 0; j < keys.length; j++) {
          if (this.values[i].key === keys[j]) {
            this.values[i].value = content[j];
          }
        }
      }
      return this.values;
    })
  }

  convertHTML(): void {
    this.data.getStudentById("1").subscribe((res) => {
      const keys = Object.keys(res.data);
      const content: SafeHtml = Object.values(res.data);
      for (let i = 0; i < this.tabs.length; i++) {
        for (let j = 0; j < keys.length; j++) {
          if (this.tabs[i].key === keys[j]) {
            this.tabs[i].value = this.sanitizer.bypassSecurityTrustHtml(content[j]);
          }
        }
      }
      return this.tabs
    })
  }
}