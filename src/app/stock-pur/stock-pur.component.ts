import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ItemAddService } from 'app/item_add.service';
import { StockAddService } from 'app/services/stock-add.service';
import { ToastrService } from 'ngx-toastr';


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
  batch:string;
  item: string;
  price: number;
  // currency: string;
  qty: number;
  unit: string;
  invo: string;
  // gid: string;
  supplier: string;
}
export interface type {
  value: string;
  viewValue: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { no: 1, batch: 'Hydrogen/1500', item: 'Hydrogen', price: 1150, qty: 5, unit: 'ml', invo: 'AS345', supplier: 'FSF234' },
  { no: 2, batch: 'HCL/1200', item: 'HCL', price: 1200, qty: 10, unit: 'bottle', invo: 'AS345', supplier: 'FSF234' },
  { no: 3, batch: 'HCL/2050', item: 'HCL', price: 2050, qty: 10, unit: 'bottle', invo: 'AS345', supplier: 'FSF234' },
  { no: 4, batch: 'Nacl/1100', item: 'Nacl', price: 150, qty: 5, unit: 'number', invo: 'AS345', supplier: 'FSF234' },
];

@Component({
  selector: 'app-stock-pur',
  templateUrl: './stock-pur.component.html',
  styleUrls: ['./stock-pur.component.scss']

})

export class StockPurComponent implements OnInit {
  item_add: FormGroup;
  pur_add: FormGroup;


  types: type[] = [
    {value: '0', viewValue: 'Apparatus'},
    {value: '1', viewValue: 'Chemical'},
  ];

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
  supplier_edit: FormGroup;
  stock_edit: FormGroup;

  constructor(private formBuilder: FormBuilder, private _item_addService:ItemAddService, private _stock_addService:StockAddService,
    private toast:ToastrService) { }
  displayedColumns: string[] = ['no', 'batch', 'item', 'price', 'qty', 'unit', 'invo', 'supplier', 'edit'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.item_add=this.formBuilder.group({
      items: ['',Validators.required],
      use: ['',Validators.required],
      spec: ['',Validators.required],
      type: ['',Validators.required],
      unit: ['',Validators.required], 
    })

    this.stock_edit=this.formBuilder.group({
      edit_batch: ['',Validators.required],
      edit_item: ['',Validators.required],
      edit_price: ['',Validators.required],
      edit_qty: ['',Validators.required],
      edit_unit: ['',Validators.required], 
      edit_invoice: ['',Validators.required],
      edit_supplier: ['',Validators.required],
    })

    this.pur_add = this.formBuilder.group({
      stock: this.formBuilder.array([this.createNewItem()]),
    })
  }
  onOpenModal(element) {
    console.log(element);
    this.stock_edit.patchValue({
      edit_batch: element.batch,
      edit_item: element.item,
      edit_price: element.price,
      edit_qty: element.qty,
      edit_unit: element.unit,
      edit_invoice: element.invo,
      edit_supplier: element.supplier,
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
      // grant_id: [],
      supplier: [],
    });

    
  }
  onSubmitPur() {
    console.log(this.pur_add.value);
    this._stock_addService.registerStock(this.pur_add.value).subscribe(res=>{
      console.log(res);
      this.toast.success(res.message);

    })

  }

  onSubmitItem() {
    console.log(this.item_add.value);
    this._item_addService.register(this.item_add.value).subscribe(res=>{
      console.log(res);
    })
  }
  
}


