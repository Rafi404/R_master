import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from 'app/services/library.service';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';
import * as $ from 'jquery';


export interface Author {
  id: string;
  author_name: string;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  authors: Author[] = [];
  bookform: FormGroup;
  authorform: FormGroup;
  submitted = false;
  loginfailed = false;
  readonly rootUrl = 'http://127.0.0.1:8000/api';
  constructor(private formBuilder: FormBuilder, private libraryservice: LibraryService) { }
  ngOnInit() {

    this.bookform = this.formBuilder.group({
      book_callno: ['', Validators.required],
      book_isbn: ['', Validators.required],
      book_imprint: ['', ],
      book_title: ['', ],
      book_fund: ['', ],
      book_subddc: ['', ],
      book_subtitle: ['', ],
      book_pages: ['', ],
      book_status: ['', ],
      book_supplier: ['', ],
      book_year: ['', Validators.required],
      book_edition: ['', ],
      book_pubdate: ['', ],
      book_series: ['', ],
      book_copies: ['', ],
      book_volume: ['', ],
      book_remarks: ['', ],
      book_number: ['', ],
      book_language: ['', ],
      book_ddc: ['', Validators.required ],
      book_author: ['', Validators.required ],
      book_billdate: ['', ],
      book_subject: ['', Validators.required ],
      book_price: ['', ],
      book_billno: ['', ],
      book_authorid: ['', Validators.required]
  })
  this.authorform = this.formBuilder.group({
    author_name: ['', Validators.required],
    nick_name: ['', Validators.required],
  })
  this.getauthors()
  }
  displayFn(user?: Author): string | undefined {
    return user ? user.author_name : undefined;
  }
  getauthors() {
    this.libraryservice.getAuthor().subscribe((data: any) => {
      this.authors = data.authors;
    });
  }
  // get f(){return this.bookform.value}
  onAddBook() {
    if (this.bookform.invalid) {
      return;
    }
    this.libraryservice.addBooks(this.bookform.value).subscribe((res: any) => {
      alert('Book id' + res.success  + 'added successfully');
    });
  }
  onAddAuthor() {
    if (this.authorform.invalid) {
     return;
    }
    this.libraryservice.addAuthor(this.authorform.value)
    .subscribe((res: any) => {
    this.bookform.patchValue({book_author: res.success.author_name, book_authorid: res.success.id});
    // this.new_author = res.success.author_name;
    this.getauthors();
    // this.('#modal').modal('hide');
    // $('#authormodel').modal('hide');
    });

  }






}
