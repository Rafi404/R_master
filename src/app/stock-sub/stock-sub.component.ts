import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { GetStockService } from 'app/services/get-stock.service';
export interface itemid {
  value: string;
  viewValue: string;
}
export interface unit {
  value: string;
  viewValue: string;
}
export interface StockData {
  batch:string;
  item: string;
  qty: number;
  unit: string;
  store_name: string;
  location: string;

}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {no: 1, batch: 'Test tube/100', item: 'Test tube', qty_left: 1, unit: 'li', store_name: 'Store 1', location:'rack3'},
//   {no: 2, batch: 'Test tube/150',  item: 'Test Tube', qty_left: 35, unit: 'No.s', store_name: 'Store 2', location:'rack2'},
//   {no: 3, batch: 'Beecker/800',  item: 'Beecker', qty_left: 15, unit: 'li', store_name: 'Store 1', location:'rack6'},
//   {no: 4, batch: 'Beecker/1100',  item: 'Beecker', qty_left: 20, unit: 'li', store_name: 'Store 1', location:'rack6'},
//   {no: 5, batch: 'HCL/1200',  item: 'HCL', qty_left: 5, unit: 'bottle', store_name: 'Store 1', location:'rack3'},
//   {no: 6, batch: 'HCL/2050',  item: 'HCL', qty_left: 5, unit: 'bottle', store_name: 'Store 1', location:'rack3'},
 
// ];

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
  displayedColumns: string[] = ['no', 'batch', 'item', 'qty', 'unit',];
  dataSource = new MatTableDataSource<StockData>();

  // filtering
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }

  constructor(private form_Builder:FormBuilder, private service: GetStockService) {}
  ngOnInit() {

    this.stk_sub=this.form_Builder.group({
  
      dt:['',Validators.required],
      itm:['',Validators.required],
      qty:['',Validators.required],
      unt:['',Validators.required],
      strnm:['',Validators.required],
      loc:['',Validators.required],
      
    })

   this.service.getStock().subscribe((res: any) => {
     console.log(res.data);
     this.dataSource=new MatTableDataSource(res.data);
   })


  }

  onSubmitItemsub(){
    console.log(this.stk_sub.value);
    console
  }

}
