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
// Services
import { ClientServiceService } from '../../shared/services/clients/client-service.service';
import { SnackBarService } from '../../shared/services/snackbar/snack-bar.service';
// Directives
import { OnlyNumberDirective } from '../../shared/directives/only-number.directive';

@Component({
  selector: 'app-trip-inspection',
  standalone: true,
  imports: [
    MatIconModule, MatCardModule, MatRadioModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule,
    MatExpansionModule, MatDividerModule, MatCheckboxModule, OnlyNumberDirective
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

  // Clients
  public clients: any[] = [];
  public client: any = {};

  constructor(
    private clientService: ClientServiceService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getClientData();
  }

  public initForm() {
    this.form = this.fb.group({
      'trip': ['pre_trip', Validators.required],
      'odometer': [''],
      'address': [''],
      'exterior_status': [''],
      'exterior_checks': this.fb.group({
        'tires': [''],
        'spare_wheel': [''],
        'lights': [''],
        'physical_damage': [''],
        'leaking_fluids': [''],
      }),
      'under_hood_status': [''],
      'under_hood_checks': this.fb.group({
        'vehicle_fluids': [''],
        'windshield_fluid': [''],
        'battery_connections': [''],
      }),
      'in_car_status': [''],
      'in_car_checks': this.fb.group({
        'warning_lights': [''],
      }),
      'notes': [''],
      'operational': [true],
      'requires_maintenance': [false],
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
    if (formControl === 'exterior_checks.tires' || formControl === 'exterior_checks.spare_wheel' || formControl === 'exterior_checks.lights' || formControl === 'exterior_checks.physical_damage' || formControl === 'exterior_checks.leaking_fluids') {
      this.form.get('exterior_status')?.setValue('');
    }
    if (formControl === 'under_hood_checks.vehicle_fluids' || formControl === 'under_hood_checks.windshield_fluid' || formControl === 'under_hood_checks.battery_connections') {
      this.form.get('under_hood_status')?.setValue('');
    }
    if (formControl === 'in_car_checks.warning_lights') {
      // This because there is no other check in the in_car_checks group
      this.form.get('in_car_status')?.setValue(status);
      this.form.get('in_car_checks.warning_lights')?.setValue(status);
    }
    else {
      this.form.get(formControl)?.setValue(status);
    }
    // Check if all the children checks are checked, failed, or na. If so, set the main status to the same status
    // Exterior
    if (this.form.get('exterior_checks.tires')?.value === status && this.form.get('exterior_checks.spare_wheel')?.value === status && this.form.get('exterior_checks.lights')?.value === status && this.form.get('exterior_checks.physical_damage')?.value === status && this.form.get('exterior_checks.leaking_fluids')?.value === status) {
      this.form.get('exterior_status')?.setValue(status);
    }
    // Under Hood
    if (this.form.get('under_hood_checks.vehicle_fluids')?.value === status && this.form.get('under_hood_checks.windshield_fluid')?.value === status && this.form.get('under_hood_checks.battery_connections')?.value === status) {
      this.form.get('under_hood_status')?.setValue(status);
    }
    // In Car
    if (this.form.get('in_car_checks.warning_lights')?.value === status) {
      this.form.get('in_car_status')?.setValue(status);
    }
    // if the form control is the main status, set all the checks to the same status
    if (formControl === 'exterior_status') {
      this.form.get('exterior_checks')?.setValue({
        'tires': status,
        'spare_wheel': status,
        'lights': status,
        'physical_damage': status,
        'leaking_fluids': status,
      });
    } else if (formControl === 'under_hood_status') {
      this.form.get('under_hood_checks')?.setValue({
        'vehicle_fluids': status,
        'windshield_fluid': status,
        'battery_connections': status,
      });
    } else if (formControl === 'in_car_status') {
      this.form.get('in_car_checks')?.setValue({
        'warning_lights': status,
      });
    }
  }

  // API mock calls

  public getClientData() {
    // Get client by id, but random every time
    let randomClientId = Math.floor(Math.random() * 5) + 1;
    this.clientService.getClient(randomClientId).subscribe((client) => {
      console.log(client);
      this.client = client;
      this.form.patchValue(client);
      // reset the status of the status checks
      this.form.get('exterior_status')?.setValue('');
      this.form.get('under_hood_status')?.setValue('');
      this.form.get('in_car_status')?.setValue('');
      // Set the status of the status checks if all the children checks are checked, failed, or na
      // Exterior
      if (client.exterior_checks.tires === 'checked' && client.exterior_checks.spare_wheel === 'checked' && client.exterior_checks.lights === 'checked' && client.exterior_checks.physical_damage === 'checked' && client.exterior_checks.leaking_fluids === 'checked') {
        this.form.get('exterior_status')?.setValue('checked');
      } else if (client.exterior_checks.tires === 'failed' && client.exterior_checks.spare_wheel === 'failed' && client.exterior_checks.lights === 'failed' && client.exterior_checks.physical_damage === 'failed' && client.exterior_checks.leaking_fluids === 'failed') {
        this.form.get('exterior_status')?.setValue('failed');
      } else if (client.exterior_checks.tires === 'na' && client.exterior_checks.spare_wheel === 'na' && client.exterior_checks.lights === 'na' && client.exterior_checks.physical_damage === 'na' && client.exterior_checks.leaking_fluids === 'na') {
        this.form.get('exterior_status')?.setValue('na');
      }
      // Under Hood
      if (client.under_hood_checks.vehicle_fluids === 'checked' && client.under_hood_checks.windshield_fluid === 'checked' && client.under_hood_checks.battery_connections === 'checked') {
        this.form.get('under_hood_status')?.setValue('checked');
      } else if (client.under_hood_checks.vehicle_fluids === 'failed' && client.under_hood_checks.windshield_fluid === 'failed' && client.under_hood_checks.battery_connections === 'failed') {
        this.form.get('under_hood_status')?.setValue('failed');
      } else if (client.under_hood_checks.vehicle_fluids === 'na' && client.under_hood_checks.windshield_fluid === 'na' && client.under_hood_checks.battery_connections === 'na') {
        this.form.get('under_hood_status')?.setValue('na');
      }
      // In Car
      if (client.in_car_checks.warning_lights === 'checked') {
        this.form.get('in_car_status')?.setValue('checked');
      } else if (client.in_car_checks.warning_lights === 'failed') {
        this.form.get('in_car_status')?.setValue('failed');
      } else if (client.in_car_checks.warning_lights === 'na') {
        this.form.get('in_car_status')?.setValue('na');
      }

    });
  }

  public updateClient() {
    console.log(this.form.value);
    let updatedClient = { ...this.client, ...this.form.value };
    console.log(updatedClient);
    this.clientService.updateClient(updatedClient).subscribe((response) => {
      if (response === null) {
        this.snackBarService.show("Client updated", 'Close', 300000, 'success');
      }
    });
  }

}
