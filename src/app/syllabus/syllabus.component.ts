import { Component, OnInit } from '@angular/core';
export interface batch {
  value: string;
  viewValue: string;
}

export interface term {
  value: string;
  viewValue: string;
}
export interface mode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent implements OnInit {
  batches: batch[] = [
    {value: '0', viewValue: 'BBA 2016-2018'},
    {value: '1', viewValue: 'BCA 2017-2020'},
    {value: '2', viewValue: 'MCA 2017-2020'}
  ];

  terms: term[] = [
    {value: '3', viewValue: 'Term 1'},
    {value: '4', viewValue: 'Term 2'},
    {value: '5', viewValue: 'Term 3'}
  ];

  modes: mode[] = [
    {value: '3', viewValue: 'Mark'},
    {value: '4', viewValue: 'Credit'},
  ];
  constructor() { 
    
  }

  ngOnInit() {
  }

}


