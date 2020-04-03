import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransportService } from 'app/services/transport.service';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  number: string;
  route: string;
  vehicle_no: string;
  driver:string,
  contact:number
}
interface status {
  value: number;
  viewValue: string;
}
interface vehicle{
  value: number;
  viewValue: string;
}
interface station{
  value: number;
  viewValue: string;
}
interface arrival_station{
  value: number;
  viewValue: string;
}
interface vehicle_type{
  value: number;
  viewValue: string;
}
interface route{
  value: number;
  viewValue: string;
}
export interface Locations {
  location_name: string;
}
export interface Charges {
  station: string;
  charge: number;
  order: number;
}
const LOCATION_DATA: Locations[] = [
  {location_name: 'Panamaram',},
];

const CHARGE_DATA: Charges[] = [
  {station: 'Panamaram',charge:2000,order:2},
];

const ROUTE_DATA: PeriodicElement[] = [
  {number: '16A', route: 'Mananthavady', vehicle_no: 'KL12H6348', driver: 'Majeed', contact: 9956854444},
  { number: '18A', route: 'Korom', vehicle_no: 'KL12B6458', driver: 'Razak', contact: 9995709722},
  {number: '15A', route: 'Kalpetta', vehicle_no: 'KL12t6778', driver: 'Balan', contact: 9564578544},
];

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})

export class TransportationComponent implements OnInit {
  statuses: status[] = [
    { value: 0, viewValue: 'Active' },
    { value: 1, viewValue: 'Stopped' },
  ];

  vehicles: vehicle[] = [
    { value: 0, viewValue: 'KL12H6348' },
    { value: 1, viewValue: 'KL12B6458' },
    { value: 2, viewValue: 'KL12t6778' },
  ];

  stations: station[] = [
    { value: 0, viewValue: 'Collge Stop' },
    { value: 1, viewValue: 'Kalpetta' },
    { value: 2, viewValue: 'Mananthavady' },
  ];

  arrival_stations: arrival_station[] = [
    { value: 0, viewValue: 'Collge Stop' },
    { value: 1, viewValue: 'Kalpetta' },
    { value: 2, viewValue: 'Mananthavady' },
  ];

  vehicle_types: vehicle_type[] = [
    { value: 0, viewValue: 'Bus' },
    { value: 1, viewValue: 'Jeep' },
    { value: 1, viewValue: 'Van' },
  ];

  routes: route[] = [
    { value: 0, viewValue: 'Kalpetta' },
    { value: 1, viewValue: 'Mananthavady' },
    { value: 2, viewValue: 'Bathery' },
  ];
  
  displayedColumns: string[] = [ 'no','number', 'route', 'vehicle_no'];  
  routeSource = new MatTableDataSource(ROUTE_DATA);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumnsLocation: string[] = ['no', 'location_name'];
  locationSource = new MatTableDataSource(LOCATION_DATA);

  displayedColumnsCharge: string[] = [ 'no','station', 'charge', 'order','edit'];
  ChargeSource = new MatTableDataSource(CHARGE_DATA);

  owner:any;
  show:any;
  show_location:any
  show_route:any;
  show_charge:any;
  StationFormGroup: FormGroup;
  VehicleFormGroup: FormGroup;
  RouteFormGroup:FormGroup;

  constructor(private formBuilder:FormBuilder,private transport_buddy:TransportService, private toast:ToastrService) { }

  ngOnInit() {
  this.locationSource.sort = this.sort;
    show:false;
    show_location:false;
    show_route:false;
    show_charge:false;
    this.routeSource.sort = this.sort;

    this.onGetVehicleNames();
    this.onGetStations();

    //Form Groups====================================
    this.VehicleFormGroup = this.formBuilder.group({
    vehicle_number: ['', Validators.required],
    vehicle_type: ['', Validators.required],
    owner_name: ['', Validators],
    vehicle_owner:['', Validators],
    });

    this.StationFormGroup = this.formBuilder.group({
      station_name: ['', Validators.required],
      // status:['1'],
      });

      this.RouteFormGroup = this.formBuilder.group({
        vehicle_number: ['', Validators.required],
        route_name: ['', Validators.required],
        departure_station: ['', Validators.required],
        departure_time: ['', Validators.required],
        arrival_station: ['', Validators.required],
        arrival_time: ['', Validators.required],
        // status:['1'],
        });
  }
  onGetStations() {
    this.transport_buddy.onGetStationsList().subscribe((res:any)=>{
      console.log(res);
      
    });
  }
  onGetVehicleNames() {
    this.transport_buddy.onGetVehicleList().subscribe((res:any)=>{
      console.log(res);
      
    })
  }
    selectOwner(selection){
    console.log(selection.value);
  }
  OnSubmitAddVehicle(){
  console.log(this.VehicleFormGroup.value);
  this.transport_buddy.onAddVehicle(this.VehicleFormGroup.value).subscribe(res => {
  console.log(res);
  this.VehicleFormGroup.reset();
  });
}
onSubmitRouteCharge(){
  this.show=!this.show;
}
showStation(){
  this.show_location=!this.show_location;
}
onShowAddRoute(){
  this.show_route=!this.show_route;
}
onShowCharge(){
  this.show_charge=!this.show_charge;
}
OnSubmitAddStation(){
  console.log(this.StationFormGroup.value);
  
  this.transport_buddy.onAddStation(this.StationFormGroup.value).subscribe(res => {
    console.log(res);
    if(res.success)
    {
      this.toast.success(res.message);
    }
      else
      {
      this.toast.warning(res.message);
    }
    this.StationFormGroup.reset();
});
}
OnSubmitRoute(){

}
}
