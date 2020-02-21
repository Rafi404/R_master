import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

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
  { no: 1, batch: 'NaCl/10',  item: 'NaCl', type: 'Chemical', qty: 5, unit: 'g',},
  { no: 2, batch: 'HCL/1200', item: 'HCL', type: 'Chemical', qty: 5, unit: 'ml',},
  { no: 3, batch: 'HCL/2050', item: 'HCL',  type: 'Chemical', qty: 5, unit: 'ml',},
  { no: 4, batch: 'N2/2250', item: 'Nitrogen gas',  type: 'Chemical', qty: 5, unit: 'ml',},
];


const ELEMENT_DATA2: PeriodicElement2[] = [
  { no: 1, batch_in_add: 'HCL/1200',  item_in_add: 'HCL', type_in_add: 'Chemical', purchased: '10', used: 5, balance:5 },
  { no: 1, batch_in_add: 'HCL/2050',  item_in_add: 'HCL', type_in_add: 'Chemical', purchased: '10', used: 5, balance:5 },
  
];







@Component({
  selector: 'app-usage-report',
  templateUrl: './usage-report.component.html',
  styleUrls: ['./usage-report.component.scss']
})
export class UsageReportComponent implements OnInit {

  items: item[] = [
    {value: '0', viewValue: 'HCL'},
    {value: '1', viewValue: 'Liquid N2'},
    {value: '2', viewValue: 'NaCl'}
  ];

  constructor(private formBuilder: FormBuilder) { }

  displayedColumns: string[] = ['no', 'batch', 'item', 'type', 'qty', 'unit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns2: string[] = ['no', 'batch_in_add', 'item_in_add', 'type_in_add', 'purchased', 'used', 'balance', 'select'];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  selection = new SelectionModel<PeriodicElement2>(true, []);

  ngOnInit() {
    this.dataSource.sort = this.sort;
    
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement2): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.no + 1}`;
  }

}
