import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ItemAddService } from 'app/item_add.service';
import { StockAddService } from 'app/services/stock-add.service';
import { ToastrService } from 'ngx-toastr';
import { GetStockService } from 'app/services/get-stock.service';
import { DatePipe } from '@angular/common';
import { error } from '@angular/compiler/src/util';


// export interface cur {
//   value: string;
//   viewValue: string;
// }

export interface Item {
  id: string;
  equipment_name: string;
}


export interface unit {
  value: string;
  viewValue: string;
}


export interface suppliers {
  id: number;
  supplier_name: string;
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

export interface Items {
  sl_no: number;
  item_name:string;
  usage: string;
  brand: string;
  type: string;
  unit: string;
  spec: string;
}

export interface type {
  value: string;
  viewValue: string;
}
export interface brand {
  value: number;
  viewValue: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { no: 1, batch: 'Hydrogen/1500', item: 'Hydrogen', price: 1150, qty: 5, unit: 'ml', invo: 'AS345', supplier: 'FSF234' },
  { no: 2, batch: 'HCL/1200', item: 'HCL', price: 1200, qty: 10, unit: 'bottle', invo: 'AS345', supplier: 'FSF234' },
  { no: 3, batch: 'HCL/2050', item: 'HCL', price: 2050, qty: 10, unit: 'bottle', invo: 'AS345', supplier: 'FSF234' },
  { no: 4, batch: 'Nacl/1100', item: 'Nacl', price: 150, qty: 5, unit: 'number', invo: 'AS345', supplier: 'FSF234' },
];

// const ELEMENT_DATA2: Items[] = [
//   { sl_no: 1, item_name: 'Hydrogen/1500', usage: 'Hydrogen', spec: '1150',type: 'Apparatus', brand: 'LR', unit:'length'},
 
// ];

@Component({
  selector: 'app-stock-pur',
  templateUrl: './stock-pur.component.html',
  styleUrls: ['./stock-pur.component.scss']

})

export class StockPurComponent implements OnInit {
  item_add: FormGroup;
  pur_add: FormGroup;


  // types: type[] = [
  //   {value: '0', viewValue: 'Apparatus'},
  //   {value: '1', viewValue: 'Chemical'},
  // ];

  // curs: cur[] = [
  //   { value: '0', viewValue: 'INR' },
  //   { value: '1', viewValue: 'DOLLAR' },
  //   { value: '2', viewValue: 'DINAR' }
  // ];

  // units: unit[] = [
  //   { value: '0', viewValue: 'ml' },
  //   { value: '1', viewValue: 'kg' },
  //   { value: '2', viewValue: 'l' },
  //   { value: '2', viewValue: 'g' },
  // ];

  // stock_items: Item[] = [
  //   { id: '0', equipment_name: 'HCL' },
  //   { id: '1', equipment_name: 'Test tube' },
  //   { id: '2', equipment_name: 'Beacker' },
  // ];

  // brands: brand[] = [
  //   { value: '0', viewValue: 'Borosilicate' },
  //   { value: '1', viewValue: 'Corning' },
  //   { value: '2', viewValue: 'LABORATORY REAGENTS' },
  //   { value: '3', viewValue: 'ANALYTICAL REAGENT' },
  // ];
  supplier_edit: FormGroup;
  stock_edit: FormGroup;
  res: any;
  GetStockService: any;
  selected_item:any;
  day:any;
  stock_items: any;
  supplier_name: any;
  total: number;
  type: any;
  types:any
  units:any;
  brands:any;
  // today:any;
  // stock_items: any;

  constructor(private formBuilder: FormBuilder, private _item_addService:ItemAddService,
     private _stock_addService:StockAddService,
    private toast:ToastrService, private getitems:GetStockService,private datepipe:DatePipe) { }

  displayedColumns: string[] = ['no', 'batch', 'item', 'price', 'qty', 'unit', 'invo', 'supplier', 'edit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // displayedColumns2: string[] = ['sl_no', 'equipment_name', 'description', 'specification', 'type', 'brand_name', 'unit'];
  displayedColumns2: string[] = ['sl_no', 'equipment_name', 'description', 'specification', 'equipment_group', 'unit_name'];
 itemSource = new MatTableDataSource<Items>();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();   
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.selected_item=[];
    this.getItem();
    this.getSupplier();
    this.onGetItemGroup();
    this.onGetBrands();
    this.onGetItemUnits();
    
    this.dataSource.sort = this.sort;
    this.itemSource.sort = this.sort;
    this.item_add=this.formBuilder.group({
      item_name: ['',Validators.required],
      use: [''],
      spec: [''],
      type: [''],
      group_id:[''],
      unit: [''], 
      qty_name:[''],
      brand:[''],
    });
    this.stock_edit=this.formBuilder.group({
      edit_batch: ['',Validators.required],
      edit_item: ['',Validators.required],
      edit_price: ['',Validators.required],
      edit_qty: ['',Validators.required],
      edit_unit: ['',Validators.required], 
      edit_invoice: ['',Validators.required],
      edit_supplier: ['',Validators.required], 
    });
    this.pur_add = this.formBuilder.group({
      invoice_number: ['',Validators.required],
      date: ['',Validators.required],
      stock: this.formBuilder.array([this.createNewItem()]),
      batch_id:['',Validators.required],
      supplier_id:['',Validators.required],
      invoice_amount:['',Validators.required],
    });
  }
  onGetItemUnits() {
    this.getitems.onGetItemUnits().subscribe((res:any)=>{
      console.log(res.units);
      this.units=res.units;
    })
  }
  onGetBrands() {
    this.getitems.onGetItemBrand().subscribe((res:any)=> {
      console.log(res.brands)
      this.brands=res.brands;
    });
  }
  onGetItemGroup() {
    this.getitems.onGetItemGroup().subscribe((res:any)=>{
      console.log(res.groups);
      this.types=res.groups;
    });
  }
  getSupplier() {
    this.getitems.onGetSupplier().subscribe((res:any)=>{
      this.supplier_name=res.supplierdata;
      console.log(res.supplierdata)
    })
  }
  today=new Date();
  getBatch(i){
    // this.selected_item=[];
    if(this.s.value[i].item !=null) {
    const day = this.datepipe.transform(this.today, 'yyyy-MM');
    this.s.value[i].batch_id = this.s.value[i].item.equipment_name + "-" + day;
    //   this.pur_add.patchValue({
    //   date:purchase_date,
    //   invoice_amount:this.total
    // })
      // console.log(this.selected_item)
    return this.s.value[i].item.equipment_name + "-" + day;
    }
  }
  getItem() {
    this.getitems.getitems().subscribe((res:any)=>{
      console.log(res.items);
      this.itemSource = new MatTableDataSource(res.items);
      this.itemSource.sort = this.sort;
    });
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
      batch_id:[],
      price: [],
      // currency: [],
      qty: [],
      // unit: [],
      // invoice: [],
      // grant_id: [],
    });
  }
  onSubmitPur() {
    var purchase_date = this.datepipe.transform(this.t.date.value, 'yyyy-MM-dd');
    console.log(purchase_date)
    this.pur_add.patchValue({
      date:purchase_date,
      invoice_amount:this.total
    });
    console.log(this.pur_add.value);
    this._stock_addService.registerStock(this.pur_add.value).subscribe(res=>{
      console.log(res);
      if(res.success)
      {
        this.toast.success(res.message);
      }
        else
        {
        this.toast.warning(res.message);
      }
      this.pur_add.reset();
    });
  }
  get t (){
    return this.pur_add.controls;
  }
  onSubmitItem() {
    console.log(this.item_add.value);
    this._item_addService.register(this.item_add.value).subscribe(res=>{
      // console.log(res);   
      // console.log(res);
      if(res.success)
      {
        this.toast.success(res.message);
      }
        else
        {
        this.toast.warning(res.message);
      }
    this.getItem();
        this.item_add.reset();
    });
  }

  oneditStock(){

  }

  getTotal(){
    this.total=0;
    for (var i = 0; i < this.s.value.length; i++) {
      this.total += +this.s.value[i].price*this.s.value[i].qty;
    }
    return this.total;
  }
}


