import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// App spinner component
import { SpinnerLoaderComponent } from './shared/services/loader/spinner-loader/spinner-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'revit-form-app';
}
