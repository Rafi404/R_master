import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface batch {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  no: number;
  add_no: number;
  name: string;
  item: string;
  item_no:number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {no: 1, add_no: 673125, name: 'Shaheer', item: 'Test tube', item_no: 2},
  {no: 1, add_no: 673126, name: 'sajid', item: 'Test tube', item_no: 2},
  {no: 1, add_no: 673127, name: 'Adhil', item: 'Test tube', item_no: 2},
  {no: 1, add_no: 673128, name: 'Ashique', item: 'Test tube', item_no: 2},
  {no: 1, add_no: 673129, name: 'Rafi', item: 'Test tube', item_no: 2},
  {no: 1, add_no: 673130, name: 'Sam', item: 'Test tube', item_no: 2},
  {no: 1, add_no: 673131, name: 'Alishan', item: 'Test tube', item_no: 2},
  {no: 1, add_no: 673122, name: 'Arsalan', item: 'Test tube', item_no: 2},
];


@Component({
  selector: 'app-issue-app',
  templateUrl: './issue-app.component.html',
  styleUrls: ['./issue-app.component.scss']
})
export class IssueAppComponent implements OnInit {

  batches: batch[] = [
    {value: '0', viewValue: 'BBA 2016-2018'},
    {value: '1', viewValue: 'BCA 2017-2020'},
    {value: '2', viewValue: 'MCA 2017-2020'}
  ];

  issue_app: any;

  constructor(private formBuilder: FormBuilder) { }

    displayedColumns: string[] = ['no', 'add_no', 'name', 'item', 'item_no'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
  
    @ViewChild(MatSort, {static: true}) sort: MatSort;
  

  ngOnInit() {

    this.dataSource.sort = this.sort;

    this.issue_app=this.formBuilder.group({
      batch: ['',Validators.required],
      add_no: ['',Validators.required],
      date: ['',Validators.required],
      item: ['',Validators.required],
      item_no: ['',Validators.required], 
    })

  }

}
