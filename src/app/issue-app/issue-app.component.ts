import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { GetStockService } from 'app/services/get-stock.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

export interface batch {
  value: string;
  viewValue: string;
}
export interface item {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  no: number;
  student_id: number;
  name: string;
  item: string;
  item_no: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { no: 1, student_id: 673125, name: 'Shaheer', item: 'Test tube', item_no: 2 },
  { no: 1, student_id: 673126, name: 'sajid', item: 'Test tube', item_no: 2 },
  { no: 1, student_id: 673127, name: 'Adhil', item: 'Test tube', item_no: 2 },
  { no: 1, student_id: 673128, name: 'Ashique', item: 'Test tube', item_no: 2 },
  { no: 1, student_id: 673129, name: 'Rafi', item: 'Test tube', item_no: 2 },
  { no: 1, student_id: 673130, name: 'Sam', item: 'Test tube', item_no: 2 },
  { no: 1, student_id: 673131, name: 'Alishan', item: 'Test tube', item_no: 2 },
  { no: 1, student_id: 673122, name: 'Arsalan', item: 'Test tube', item_no: 2 },
];


@Component({
  selector: 'app-issue-app',
  templateUrl: './issue-app.component.html',
  styleUrls: ['./issue-app.component.scss']
})
export class IssueAppComponent implements OnInit {

  batches: batch[] = [
    { value: '0', viewValue: 'BBA 2016-2018' },
    { value: '1', viewValue: 'BCA 2017-2020' },
    { value: '2', viewValue: 'MCA 2017-2020' }
  ];

  // items: item[] = [
  //   {value: '0', viewValue: 'Test Tube'},
  //   {value: '1', viewValue: 'Beacker'},
  //   {value: '2', viewValue: 'Burette'}
  // ];


  issue_app: any;
  items: any;
  today: Date;
  today_date: any;
  constructor(private formBuilder: FormBuilder, private getitems: GetStockService, private datepipe: DatePipe, private toast:ToastrService) { }
  displayedColumns: string[] = ['no', 'student_id', 'name', 'select'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.item_no + 1}`;
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    this.getBatchList();
    this.getitem();
    this.dataSource.sort = this.sort;
    this.issue_app = this.formBuilder.group({
      batch: ['', Validators.required],
      student_id: ['', Validators.required],
      date: [new Date(), Validators.required],
      item: ['', Validators.required],
      item_no: ['', Validators.required],
      students: ['', Validators.required],
    });

  }
  getBatchList() {
    this.getitems.onGetBatch().subscribe((res: any) => {
      console.log(res);
      //  this.batch=
    });
  }
  getitem() {
    this.getitems.getitems().subscribe((res: any) => {
      console.log(res.items);
      this.items = res.items;
    });
  }

  get t() {
    return this.issue_app.controls;
  }

  onSubmit_isuue() {
    const today_date = this.datepipe.transform(this.t.date.value, 'yyyy-MM-dd');
    this.issue_app.patchValue({
      students: this.selection.selected,
      date: today_date
    })
    console.log(this.issue_app.value);
    this.getitems.onIssueApparatus(this.issue_app.value).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.toast.success(res.message);
      }
      else {
        this.toast.warning(res.message);
      }
      this.issue_app.reset();
    });

  }

}
