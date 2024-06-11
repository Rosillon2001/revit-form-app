import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInspectionComponent } from './trip-inspection.component';

describe('TripInspectionComponent', () => {
  let component: TripInspectionComponent;
  let fixture: ComponentFixture<TripInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripInspectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
