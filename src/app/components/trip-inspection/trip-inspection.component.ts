import { Component, OnInit } from '@angular/core';
// Common Module
import { CommonModule } from '@angular/common';
// Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
// Form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Animations 
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-trip-inspection',
  standalone: true,
  imports: [
    MatIconModule, MatCardModule, MatRadioModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule,
    MatExpansionModule, MatDividerModule, MatCheckboxModule
  ],
  templateUrl: './trip-inspection.component.html',
  styleUrl: './trip-inspection.component.scss',
  animations: [
    trigger('rotate', [
      state('true', style({ transform: 'rotate(360deg)' })),
      transition('true => false', animate('1000ms ease-out')),
    ]),
    trigger('refresh', [
      state('true', style({ transform: 'rotate(360deg)' })),
      transition('true => false', animate('1000ms ease-out')),
    ]
    )
  ],
})
export class TripInspectionComponent implements OnInit{

  // Animations
  public rotate: boolean = false;
  public refresh: boolean = false;

  // Expansion Panel States
  exteriorPanelState: boolean = false;
  underHoodPanelState: boolean = false;
  inCarPanelState: boolean = false;

  // Form
  public fb: FormBuilder = new FormBuilder();
  public form: FormGroup = this.fb.group({});


  constructor() { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'trip': ['pre-trip', Validators.required],
      'odometer': [''],
      'address': [''],
      'exterior-status': [''],
      'exterior-checks': this.fb.group({
        'tires': [''],
        'spare-wheel': [''],
        'lights': [''],
        'physical-damage': [''],
        'leaking-fluids': [''],
      }),
      'under-hood-status': [''],
      'under-hood-checks': this.fb.group({
        'vehicle-fluids': [''],
        'windshield-fluid': [''],
        'battery-connections': [''],
      }),
      'in-car-status': [''],
      'in-car-checks': this.fb.group({
        'warning-lights': [''],
      }),
      'notes': [''],
      'operational': [true],
      'requires-maintenance': [false],
    });
  }

  public toggleRotate() {
    this.rotate = true;
    setTimeout(() => {
      this.rotate = false;
    }, 300);
  }

  toggleRefresh() {
    this.refresh = true;
    setTimeout(() => {
      this.refresh = false;
    }, 300);
  }


  changeStatus(status: string, formControl: string, event: any) {
    // prevent the expansion panel from opening when clicking the radio button
    event.stopPropagation();
    // if one child status is changed, remove main status
    if (formControl === 'exterior-checks.tires' || formControl === 'exterior-checks.spare-wheel' || formControl === 'exterior-checks.lights' || formControl === 'exterior-checks.physical-damage' || formControl === 'exterior-checks.leaking-fluids') {
      this.form.get('exterior-status')?.setValue('');
    }
    if (formControl === 'under-hood-checks.vehicle-fluids' || formControl === 'under-hood-checks.windshield-fluid' || formControl === 'under-hood-checks.battery-connections') {
      this.form.get('under-hood-status')?.setValue('');
    }
    if (formControl === 'in-car-checks.warning-lights') {
      // This because there is no other check in the in-car-checks group
      this.form.get('in-car-status')?.setValue(status);
      this.form.get('in-car-checks.warning-lights')?.setValue(status);
    }
    else {
      this.form.get(formControl)?.setValue(status);
    }
    // if the form control is the main status, set all the checks to the same status
    if (formControl === 'exterior-status') {
      this.form.get('exterior-checks')?.setValue({
        'tires': status,
        'spare-wheel': status,
        'lights': status,
        'physical-damage': status,
        'leaking-fluids': status,
      });
    } else if (formControl === 'under-hood-status') {
      this.form.get('under-hood-checks')?.setValue({
        'vehicle-fluids': status,
        'windshield-fluid': status,
        'battery-connections': status,
      });
    } else if (formControl === 'in-car-status') {
      this.form.get('in-car-checks')?.setValue({
        'warning-lights': status,
      });
    }
  }

}
