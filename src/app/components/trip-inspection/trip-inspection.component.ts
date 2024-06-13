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

  // Clients
  public clients: any[] = [];
  public client: any = {};

  constructor(
    private clientService: ClientServiceService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.initForm();
    // get clients
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      console.log(this.clients)
    });
    // Get client by id
    this.clientService.getClient(2).subscribe((client) => {
      console.log(client);
      this.client = client;
      this.form.patchValue(client);
      console.log(this.form.value);
    });
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
  public updateClient() {
    console.log(this.client);
    this.client.name = 'Pepito Perez';
    console.log(this.client);
    this.clientService.updateClient(this.client).subscribe((response) => {
      if (response === null) {
        this.snackBarService.show("Client updated", 'Close', 3000, 'success');
      }
    });

    // Get client by id
    this.clientService.getClient(1).subscribe((response) => {
      console.log(response);
      if (response) {
        this.client = response;
      }
    });
  }

}
