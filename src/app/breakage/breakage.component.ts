import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
export interface type {
  value: number;
  viewValue: string;
}

export interface batch {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-breakage',
  templateUrl: './breakage.component.html',
  styleUrls: ['./breakage.component.scss']
})
export class BreakageComponent implements OnInit {
  selected_type:any
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

 types: type[] = [
    {value: 0, viewValue: 'Individual'},
    {value: 1, viewValue: 'Common'},
  ];

  batches: batch[] = [
    {value: '0', viewValue: 'BBA 2018-2020'},
    {value: '1', viewValue: 'BCA 2020-2022'},
  ];
  breackage: FormGroup;

 
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {  
    this.breackage=this.formBuilder.group({
      breackage_date: ['', Validators.required],
      breackage_type: ['', Validators.required],
      admission_no: ['', Validators.required],
      batch: ['', Validators.required],
      item: ['', Validators.required],
      breackage_note: ['', Validators.required],
    });

    this.selected_type=1;
  }

//   onChangeType(){
// this.show=!this.show;
//   }

}
