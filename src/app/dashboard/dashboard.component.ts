import { Component, OnInit, Input, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AuthserviceService } from 'app/auth/authservice.service';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { LibraryService } from 'app/services/library.service';
import { MatTableDataSource } from '@angular/material';
import {MatSort, MatSortable, MatPaginator} from '@angular/material';
import { of, zip } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['slNo', 'id', 'author', 'category', 'rack_no', 'status', 'update'];
  books: MatTableDataSource<any>;
  book: any;
  bookhistory: any;
  statistics: any;
  @ViewChild (MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator;
  constructor(private authservice: AuthserviceService, private libraryService: LibraryService) {
  }
  ngOnInit() {
    this.authservice.getBooks().subscribe((data: any) => {
      // if (!data.books) {
      //   return;
      // }
      this.books = new MatTableDataSource(data.books);
      this.books.sort = this.sort;
      this.books.paginator = this.paginator;
   });
      this.libraryService.getStatistics().subscribe((result: any) => {
        this.statistics = result.statistics;
      });
    }
  showmodel(book) {
    this.book = book;
    this.libraryService.getHistory(book.id).subscribe((result: any) => {
      this.bookhistory = result.history;
      // console.log(result);
    });
  }
  applyFilter(filterValue: string) {
    this.books.filter = filterValue.trim().toLowerCase();
   console.log(filterValue);
  }

}
