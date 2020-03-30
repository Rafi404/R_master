import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
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
  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe, private stock: GetStockService,
  private getitems: GetStockService, private toast:ToastrService) { }

  displayedColumns: string[] = ['no', 'batch', 'item', 'type', 'qty', 'unit'];
  dataSource = new MatTableDataSource<usageData>();

  displayedColumns2: string[] = ['no', 'batch_number', 'equipment_name', 'quantity', 'total_used', 'balance', 'usage_qty'];
  ItemUsageSource = new MatTableDataSource<usageitemData>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.Add_usage = this.formBuilder.group({
      item:["",Validators.required],
      used_quantity:["",Validators.required],
      last_usage:["",Validators.required],
      description:["",],
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
  onChangeItem(item){
    this.getitems.onGetIndividualItem(item).subscribe((res:any)=>{
      console.log(res);
      this.ItemUsageSource=new MatTableDataSource(res.data)
    })
  }
  OnSubmitUsage() {
    this.getitems.onAddUsage(this.Add_usage.value).subscribe((res:any)=>{
      console.log(res);
      if(res.success)
      {
        this.toast.success(res.message);
      }
        else
        {
        this.toast.warning(res.message);
      }
      this.Add_usage.reset();
    })
  }
}






