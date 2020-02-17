import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface itemid {
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
  qty_left: number;
  unit: string;
  store_name: string;
  location: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {no: 1, item: 'Hydrogen', qty_left: 1, unit: 'li', store_name: 'Store 1', location:'rack3'},
  {no: 2, item: 'Test Tube', qty_left: 35, unit: 'No.s', store_name: 'Store 2', location:'rack2'},
  {no: 3, item: 'Beecker', qty_left: 15, unit: 'li', store_name: 'Store 1', location:'rack6'},
  {no: 4, item: 'buret', qty_left: 20, unit: 'li', store_name: 'Store 1', location:'rack6'},
  {no: 5, item: 'Pippet', qty_left: 20, unit: 'li', store_name: 'Store 1', location:'rack3'},
 
];

@Component({
  selector: 'app-stock-sub',
  templateUrl: './stock-sub.component.html',
  styleUrls: ['./stock-sub.component.scss']
})
export class StockSubComponent implements OnInit {

  stk_sub:FormGroup;

  itemids: itemid[] = [
    {value: '0', viewValue: 'Item1'},
    {value: '1', viewValue: 'Item2'},
    {value: '2', viewValue: 'Item3'}
  ];
  units: unit[] = [
    {value: '0', viewValue: 'ml'},
    {value: '1', viewValue: 'g'},
    {value: '2', viewValue: 'litter'}
  ];
  displayedColumns: string[] = ['no', 'item', 'qty_left', 'unit', 'store_name', 'location'];
  dataSource = ELEMENT_DATA;
  

  constructor(private form_Builder:FormBuilder) {
    
   }

  ngOnInit() {

    this.stk_sub=this.form_Builder.group({
  
      dt:['',Validators.required],
      itm:['',Validators.required],
      qty:['',Validators.required],
      unt:['',Validators.required],
      strnm:['',Validators.required],
      loc:['',Validators.required],
      
    })
  }

  onSubmitItemsub(){
    console.log(this.stk_sub.value);
    console
  }

}
