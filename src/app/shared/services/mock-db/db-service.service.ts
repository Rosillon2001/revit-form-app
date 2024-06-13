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
      {'id': 1, 'name': 'John Doe', 'org_name': 'Car Speed', 'image': '../../../assets/images/mustang.webp', 'car_group': 'Group A', 'car_brand': 'FORD', 
        'car_model': '50th Aniversary Mustang', 'car_year': '2015', 'car_color': 'Blue', 'trip': 'post_trip',
        'odometer': '63787', 'address': '1234 Main St.', 
        'exterior_checks': { 'tires': '', 'spare_wheel': '', 'lights': '', 'physical_damage': '', 'leaking_fluids': ''}, 
        'under_hood_checks': {'vehicle_fluids': '', 'windshield_fluid': '', 'battery_connections': ''},
        'in_car_checks': {'warning_lights': ''},
        'notes': '', 'operational': true, 'requires_maintenance': false
      },
      // Create random data without any empty properties, remember that status are 'checked', 'failed', or 'na'
      {'id': 2, 'name': 'Jane Doe', 'org_name': 'Car Speed', 'image': '../../../assets/images/mustang.webp', 'car_group': 'Group A', 'car_brand': 'FORD', 
        'car_model': '50th Aniversary Mustang', 'car_year': '2015', 'car_color': 'Blue', 'trip': 'pre_trip',
        'odometer': '63787', 'address': '1234 Main St.', 
        'exterior_checks': { 'tires': 'checked', 'spare_wheel': 'checked', 'lights': 'checked', 'physical_damage': 'checked', 'leaking_fluids': 'checked'}, 
        'under_hood_checks': {'vehicle_fluids': 'checked', 'windshield_fluid': 'checked', 'battery_connections': 'checked'},
        'in_car_checks': {'warning_lights': 'checked'},
        'notes': 'Some notes', 'operational': true, 'requires_maintenance': true
      },
      {'id': 3, 'name': 'John Smith', 'org_name': 'Car Speed', 'image': '../../../assets/images/mustang.webp', 'car_group': 'Group A', 'car_brand': 'FORD', 
        'car_model': '50th Aniversary Mustang', 'car_year': '2015', 'car_color': 'Blue', 'trip': 'pre_trip',
        'odometer': '63787', 'address': '1234 Main St.', 
        'exterior_checks': { 'tires': 'checked', 'spare_wheel': 'checked', 'lights': 'checked', 'physical_damage': 'checked', 'leaking_fluids': 'checked'}, 
        'under_hood_checks': {'vehicle_fluids': 'checked', 'windshield_fluid': 'checked', 'battery_connections': 'checked'},
        'in_car_checks': {'warning_lights': 'checked'},
        'notes': 'Some notes', 'operational': true, 'requires_maintenance': false
      },
      // some with failed and na statuses
      {'id': 4, 'name': 'Jane Smith', 'org_name': 'Car Speed', 'image': '../../../assets/images/mustang.webp', 'car_group': 'Group A', 'car_brand': 'FORD', 
        'car_model': '50th Aniversary Mustang', 'car_year': '2015', 'car_color': 'Blue', 'trip': 'pre_trip',
        'odometer': '63787', 'address': '1234 Main St.', 
        'exterior_checks': { 'tires': 'failed', 'spare_wheel': 'checked', 'lights': 'checked', 'physical_damage': 'checked', 'leaking_fluids': 'checked'}, 
        'under_hood_checks': {'vehicle_fluids': 'checked', 'windshield_fluid': 'na', 'battery_connections': 'checked'},
        'in_car_checks': {'warning_lights': 'checked'},
        'notes': 'Some notes', 'operational': true, 'requires_maintenance': false
      },
      {'id': 5, 'name': 'John Doe', 'org_name': 'Car Speed', 'image': '../../../assets/images/mustang.webp', 'car_group': 'Group A', 'car_brand': 'FORD', 
        'car_model': '50th Aniversary Mustang', 'car_year': '2015', 'car_color': 'Blue', 'trip': 'post_trip',
        'odometer': '63787', 'address': '1234 Main St.', 
        'exterior_checks': { 'tires': 'checked', 'spare_wheel': 'checked', 'lights': 'checked', 'physical_damage': 'checked', 'leaking_fluids': 'checked'}, 
        'under_hood_checks': {'vehicle_fluids': 'checked', 'windshield_fluid': 'checked', 'battery_connections': 'checked'},
        'in_car_checks': {'warning_lights': 'checked'},
        'notes': 'Some notes', 'operational': true, 'requires_maintenance': false
      },
    ];
    return {clients};
  }
}
