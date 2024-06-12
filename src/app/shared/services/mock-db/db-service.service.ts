import { Injectable } from '@angular/core';

// In Memory Web API
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService implements InMemoryDbService{

  createDb(): {} | Observable<{}> | Promise<{}> {
    let clients = [
      {id: 1, name: 'John Doe', org_name: 'Car Speed', image: '', car_group: 'Group A', car_brand: 'FORD', 
        car_model: '50th Aniversary Mustang', car_year: '2015', car_color: 'Blue', trip: 'post-trip',
        odometer: '63787', address: '1234 Main St.', tires: '', spare_wheel: '', lights: '',
        physical_damage: '', leaking_fluids: '', vehicle_fluids: '', windshield_fluid: '', battery_connections: '',
        warning_lights: '', notes: '', operational: true, requires_maintenance: false
      },
      // Create random data without any empty properties, remember that status are 'checked', 'failed', or 'na'
      {id: 2, name: 'Jane Doe', org_name: 'Car Speed', image: '', car_group: 'Group B', car_brand: 'CHEVROLET', 
        car_model: 'Camaro', car_year: '2018', car_color: 'Red', trip: 'pre-trip',
        odometer: '12345', address: '5678 Elm St.', tires: 'checked', spare_wheel: 'checked', lights: 'checked',
        physical_damage: 'checked', leaking_fluids: 'checked', vehicle_fluids: 'checked', windshield_fluid: 'checked',
        battery_connections: 'checked', warning_lights: 'checked', notes: 'This is a note.', operational: true, requires_maintenance: false
      },
      // some with failed and na statuses
      {id: 3, name: 'John Smith', org_name: 'Car Speed', image: '', car_group: 'Group A', car_brand: 'FORD', 
        car_model: 'Explorer', car_year: '2019', car_color: 'Black', trip: 'post-trip',
        odometer: '98765', address: '4321 Oak St.', tires: 'failed', spare_wheel: 'na', lights: 'failed',
        physical_damage: 'failed', leaking_fluids: 'failed', vehicle_fluids: 'failed', windshield_fluid: 'failed',
        battery_connections: 'failed', warning_lights: 'failed', notes: 'This is a note.', operational: true, requires_maintenance: false
      },

    ];
    return {clients};
  }
}
