import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerLoaderService {

  spinner_state: boolean = false;

  constructor() { }

  setSpinnerState(state: boolean) {
    this.spinner_state = state;
  }

  getSpinnerState() {
    return this.spinner_state;
  }
}
