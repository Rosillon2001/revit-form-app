import { Component } from '@angular/core';
// Mat spinner
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// Spinner service
import { SpinnerLoaderService } from '../spinner-loader.service';
// Common Module
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './spinner-loader.component.html',
  styleUrl: './spinner-loader.component.scss'
})
export class SpinnerLoaderComponent {

  constructor(
    public spinnerLoaderService: SpinnerLoaderService
  ) { }

}
