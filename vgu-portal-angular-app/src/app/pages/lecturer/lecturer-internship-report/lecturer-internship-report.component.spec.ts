import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerInternshipReportComponent } from './lecturer-internship-report.component';

describe('LecturerIntershipReportComponent', () => {
  let component: LecturerInternshipReportComponent;
  let fixture: ComponentFixture<LecturerInternshipReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerInternshipReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerInternshipReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
