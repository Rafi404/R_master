import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface cur {
  value: string;
  viewValue: string;
}

export interface unit {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  no: number;
  item: string;
  price: number;
  currency: string;
  qty: number;
  unit: string;
  invo: string;
  gid: string;
}
export interface type {
  value: string;
  viewValue: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { no: 1, item: 'Hydrogen', price: 1150, currency: 'INR', qty: 5, unit: 'ml', invo: 'AS345', gid: 'FSF234' },
  { no: 2, item: 'HCL', price: 1200, currency: 'INR', qty: 5, unit: 'ml', invo: 'AS345', gid: 'FSF234' },
  { no: 3, item: 'Nitrogen gas', price: 2050, currency: 'INR', qty: 5, unit: 'ml', invo: 'AS345', gid: 'FSF234' },
  { no: 4, item: 'Litmus', price: 150, currency: 'INR', qty: 5, unit: 'number', invo: 'AS345', gid: 'FSF234' },
];

@Component({
  selector: 'app-stock-pur',
  templateUrl: './stock-pur.component.html',
  styleUrls: ['./stock-pur.component.scss']

})

export class StockPurComponent implements OnInit {
  item_add: FormGroup;

  types: type[] = [
    {value: '0', viewValue: 'Apparatus'},
    {value: '1', viewValue: 'Chemical'},
  ];

  pur_add: FormGroup;

  // dataSource = ELEMENT_DATA;

  curs: cur[] = [
    { value: '0', viewValue: 'INR' },
    { value: '1', viewValue: 'DOLLAR' },
    { value: '2', viewValue: 'DINAR' }
  ];
  units: unit[] = [
    { value: '0', viewValue: 'ml' },
    { value: '1', viewValue: 'kg' },
    { value: '2', viewValue: 'l' },
    { value: '2', viewValue: 'g' },

  ];

  constructor(private formBuilder: FormBuilder) { }
  displayedColumns: string[] = ['no', 'item', 'price', 'currency', 'qty', 'unit', 'invo', 'gid'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.item_add=this.formBuilder.group({
      items: ['',Validators.required],
      use: ['',Validators.required],
      spec: ['',Validators.required],
      type: ['',Validators.required],
      qty: ['',Validators.required], 
    })
    this.pur_add = this.formBuilder.group({
      stock: this.formBuilder.array([this.createNewItem()]),
    })
  }
  get s() {
    return <FormArray>this.pur_add.get("stock");
  }
  onAddStock() {
    this.s.push(this.createNewItem());
  }
  onRemoveRow(i) {
    this.s.removeAt(i);
  }
  createNewItem(): FormGroup {
    return this.formBuilder.group({
      
      item: [],
      price: [],
      currency: [],
      qty: [],
      unit: [],
      invoice: [],
      grant_id: [],
    });

    
  }
  onSubmitPur() {
    console.log(this.pur_add.value);
  }

  onSubmitItem() {
    console.log(this.item_add.value);
  }

}
