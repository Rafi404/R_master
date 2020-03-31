import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource, MatSort, MatTable } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { GetStockService } from 'app/services/get-stock.service';
import { ToastrService } from 'ngx-toastr';

export interface usageData {
  no: number;
  batch: string;
  item: string;
  type: string;
  qty: number;
  unit: string;
}
export interface usageitemData {
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
// const ELEMENT_DATA2: PeriodicElement2[] = [
//   { no: 1, batch_in_add: 'HCL/1200', item_in_add: 'HCL', type_in_add: 'Chemical', purchased: '10', used: 5, balance: 5 },
//   { no: 1, batch_in_add: 'HCL/2050', item_in_add: 'HCL', type_in_add: 'Chemical', purchased: '10', used: 5, balance: 5 },
// ];

@Component({
  selector: 'app-usage-report',
  templateUrl: './usage-report.component.html',
  styleUrls: ['./usage-report.component.scss']
})
export class UsageReportComponent implements OnInit {
  from_date: any;
  to_date: any;
  items: any;
  Add_usage: FormGroup;
  desc: any;
  last_usage_date: Date;
  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe, private stock: GetStockService,
    private getitems: GetStockService, private toast: ToastrService) { }

  displayedColumns: string[] = ['no', 'batch_number', 'equipment_name', 'total_used', 'unit_name'];
  dataSource = new MatTableDataSource<usageData>();

  displayedColumns2: string[] = ['no', 'batch_number', 'equipment_name', 'quantity', 'total_used', 'balance', 'usage_qty'];
  ItemUsageSource = new MatTableDataSource<usageitemData>();
  @ViewChild('rTable', { static: true }) rTable: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.from_date = new Date();
    this.to_date = new Date();
    this.last_usage_date = new Date();
    this.Add_usage = this.formBuilder.group({
      // item: ["", Validators.required],
      // used_quantity: ["", Validators.required],
      last_usage: ["", Validators.required],
      description: ["",],
      data: this.formBuilder.array([]),
      // data: this.formBuilder.array([this.createNewItem()]),

    })
    this.dataSource.sort = this.sort;
    this.getitem();
  }
  getitem() {
    this.getitems.getitems().subscribe((res: any) => {
      console.log(res.items);
      this.items = res.items;
    });
  }
  onGetUsageReport(from_date, to_date) {
    // console.log(from_date,to_date);
    const fdate = this.datepipe.transform(from_date, 'yyyy-MM-dd');
    const tdate = this.datepipe.transform(to_date, 'yyyy-MM-dd');

    this.stock.onGetUsageReport(fdate, tdate).subscribe((res: any) => {
      console.log(res.data);
      this.dataSource = new MatTableDataSource(res.data);
    });
  }
  onChangeItem(item) {
    this.getitems.onGetIndividualItem(item).subscribe((res: any) => {
      console.log(res);
      // this.ItemUsageSource=new MatTableDataSource(res.data)
      this.LoadData(res.data);
    })
  }
  get add() {
    return this.Add_usage.controls;
  }
  LoadData(data1) {
    this.s.clear();
    const control = <FormArray>this.Add_usage.get('data');
    const ldate = this.datepipe.transform(this.last_usage_date, 'yyyy-MM-dd');
    for (const dat of data1) {
      const grp = this.formBuilder.group({
        stock_id: dat.stock_id,
        equipment_id: dat.equipment_id,
        date: ldate,
        used_amount: [(dat.quantity - dat.total_used), Validators.max(dat.quantity - dat.total_used)],
        stock_line_id: dat.stock_line_id,
        // stock_id:dat.stock_id,
        batch_number: dat.batch_number,
        // equipment_id:dat.equipment_id,
        equipment_name: dat.equipment_name,
        description: dat.description,
        quantity: dat.quantity,
        unit_name: dat.unit_name,
        total_used: dat.total_used,
        balance: dat.quantity - dat.total_used,
      });
      control.push(grp);
    }
    this.rTable.renderRows();
    console.log(this.Add_usage.value);

  }
  OnSubmitUsage() {
    if (this.Add_usage.invalid) {
      this.toast.warning('Give proper inputs', 'Warning');
    } else {
      const ldate = this.datepipe.transform(this.add.last_usage.value, 'yyyy-MM-dd');
      console.log(this.desc);
      console.log(ldate);
      console.log(this.s.value);
      for(var i=0;i<this.s.length;i++){
        this.s.at(i).patchValue({
          date: ldate,
          description: this.desc,
        });
      }
      console.log(this.Add_usage.value);      
      this.getitems.onAddUsage(this.Add_usage.value).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          this.toast.success(res.message);
        }
        else {
          this.toast.warning(res.message);
        }
        this.Add_usage.reset();
      });
    }

  }
  get s(): FormArray {
    return <FormArray>this.Add_usage.get("data") as FormArray;
  }
  // onAddStock() {
  //   this.s.push(this.createNewItem());
  // }
  // onRemoveRow(i) {
  //   this.s.removeAt(i);
  // }
  // createNewItem(): FormGroup {
  //   return this.formBuilder.group({
  //     stock_id: [],
  //     equipment_id: [],
  //     date: [],
  //     used_amount: [],
  //     description: [],
  //   });
  // }
}






