import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface PeriodicElement {
  no: number;
  batch: string;
  item: string;
  type: string;
  qty: number;
  unit: string;
}

export interface PeriodicElement2 {
  no: number;
  batch_in_add: string;
  item_in_add: string;
  type_in_add: string;
  purchased: string;
  used: number;
  balance: number;
}

export interface item {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { no: 1, batch: '1150',  item: 'Hydrogen', type: 'Chemical', qty: 5, unit: 'ml',},
  { no: 2, batch: '1200', item: 'HCL', type: 'Chemical', qty: 5, unit: 'ml',},
  { no: 3, batch: '2050', item: 'Nitrogen gas',  type: 'Apparatus', qty: 5, unit: 'ml',},
  { no: 4, batch: '150', item: 'Litmus',  type: 'Apparatus', qty: 5, unit: 'number',},
];


const ELEMENT_DATA2: PeriodicElement2[] = [
  { no: 1, batch_in_add: 'hggh',  item_in_add: 'Hydrogen', type_in_add: 'Chemical', purchased: '5', used: 5, balance:4 },
  { no: 1, batch_in_add: 'hggh',  item_in_add: 'Hydrogen', type_in_add: 'Chemical', purchased: '5', used: 5, balance:4 },
  { no: 1, batch_in_add: 'hggh',  item_in_add: 'Hydrogen', type_in_add: 'Chemical', purchased: '5', used: 5, balance:4 },
  { no: 1, batch_in_add: 'hggh',  item_in_add: 'Hydrogen', type_in_add: 'Chemical', purchased: '5', used: 5, balance:4 },
  { no: 1, batch_in_add: 'hggh',  item_in_add: 'Hydrogen', type_in_add: 'Chemical', purchased: '5', used: 5, balance:4 },
  
];







@Component({
  selector: 'app-usage-report',
  templateUrl: './usage-report.component.html',
  styleUrls: ['./usage-report.component.scss']
})
export class UsageReportComponent implements OnInit {

  items: item[] = [
    {value: '0', viewValue: 'Test tube'},
    {value: '1', viewValue: 'Burete'},
    {value: '2', viewValue: 'Pippet'}
  ];

  constructor(private formBuilder: FormBuilder) { }

  displayedColumns: string[] = ['no', 'batch', 'item', 'type', 'qty', 'unit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns2: string[] = ['no', 'batch_in_add', 'item_in_add', 'type_in_add', 'purchased', 'used', 'balance'];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
