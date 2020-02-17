import { Component, OnInit } from '@angular/core';
export interface type {
  value: string;
  viewValue: string;
}
export interface replace {
  value: string;
  viewValue: string;
}
export interface rpmode {
  value: string;
  viewValue: string;
}
export interface rptb {
  value: string;
  viewValue: string;
}
export interface rcvb {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-breakage',
  templateUrl: './breakage.component.html',
  styleUrls: ['./breakage.component.scss']
})
export class BreakageComponent implements OnInit {
  types: type[] = [
    {value: '0', viewValue: 'Commmon'},
    {value: '1', viewValue: 'Individual'},
  ];

  replaced: replace[] = [
    {value: '0', viewValue: 'Yes'},
    {value: '1', viewValue: 'No'},
  ];

  rpmodes: rpmode[] = [
    {value: '0', viewValue: 'By Cash'},
    {value: '1', viewValue: 'By product'},
  ];

  rptby: rptb[] = [
    {value: '0', viewValue: 'Faculty 1'},
    {value: '1', viewValue: 'Faculty 2'},
  ];
 
  rcvby: rcvb[] = [
    {value: '0', viewValue: 'Faculty 1'},
    {value: '1', viewValue: 'Faculty 2'},
  ];
 


  constructor() { }

  ngOnInit() {
  }

}
