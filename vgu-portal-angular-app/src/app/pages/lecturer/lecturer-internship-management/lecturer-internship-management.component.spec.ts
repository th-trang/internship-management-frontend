import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerInternshipManagementComponent } from './lecturer-internship-management.component';

describe('LecturerIntershipManagementComponent', () => {
  let component: LecturerInternshipManagementComponent;
  let fixture: ComponentFixture<LecturerInternshipManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerInternshipManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerInternshipManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
