import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipInformationComponent } from './internship-information.component';

describe('InternshipInformationComponent', () => {
  let component: InternshipInformationComponent;
  let fixture: ComponentFixture<InternshipInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
