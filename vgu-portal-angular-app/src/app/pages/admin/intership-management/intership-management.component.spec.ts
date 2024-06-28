import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntershipManagementComponent } from './intership-management.component';

describe('IntershipManagementComponent', () => {
  let component: IntershipManagementComponent;
  let fixture: ComponentFixture<IntershipManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntershipManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntershipManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
