import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryService } from 'app/services/library.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
// export interface Transaction {
//   id: string;
//   book_no: string;
//   issuable_id: string;
//   issuable_type: string;
//   issued_date: string;
//   returned_date: string;
//   issued_status: string;
//   fine: string;
//   librarian_id: string;
//   created_at: string;
//   updated_at: string;
//   book_title: string;
//   faculty_name: string;
//   std_name: string;
// }
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ['issued_date', 'book_no', 'issuable_id', 'issued_status'];
  transactions: MatTableDataSource<any>;
  dep_transactions: any;
  staff_transactions: any;
  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})sort: MatSort;
  constructor(private libraryservice: LibraryService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.libraryservice.getTransactions().subscribe((res: any) => {
      // console.log(res);
      this.transactions = new MatTableDataSource(res.transactions);
      this.transactions.sort = this.sort;
      this.transactions.paginator = this.paginator;
    });
    this.libraryservice.getDepTransactions().subscribe((res: any) => {
      console.log(res);
      this.dep_transactions = res.students;
      this.staff_transactions = res.staff[0];
    });
  }
  getSum(column): number {
    let sum = 0;
    for (let i = 0; i < this.dep_transactions.length; i++) {
      sum += Number(this.dep_transactions[i][column]);
    }
    return sum;
  }
  applyFilter(filterValue: string) {
     this.transactions.filter = filterValue.trim().toLowerCase();
    console.log(this.transactions);
  }
}
