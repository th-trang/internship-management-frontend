import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerInternshipScoreComponent } from './lecturer-internship-score.component';

describe('LecturerInternshipScoreComponent', () => {
  let component: LecturerInternshipScoreComponent;
  let fixture: ComponentFixture<LecturerInternshipScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerInternshipScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerInternshipScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
