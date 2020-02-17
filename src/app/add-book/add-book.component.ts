import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'app/services/library.service';
import {FormArray, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MessageService } from 'app/services/message.service';
declare var $: any
export interface Author {
  id: number;
  author_name: string;
}
export interface BookSubject {
  book_subject: string;
  id: number;
}
export interface Ddc {
  title: string;
  id: number;
}
export interface Subddc {
sub_caption: string;
id: number;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  bookForm: FormGroup;
  authorform: FormGroup;
  authors: Author[] = [];
  book_subjects: BookSubject[] = [];
  book_ddc: Ddc[] = [];
  book_subddc: Subddc[] = [];
  filteredOptions: Observable<Author[]>;
  filteredSubjects: Observable<BookSubject[]>;
  filteredDdc: Observable<Ddc[]>;
  filteredSubddc: Observable<Subddc[]>;
  ismodelHide = false;
  get formArray(): AbstractControl | null { return this.bookForm.get('formArray'); }
  constructor(private _formBuilder: FormBuilder, private libraryservice: LibraryService, private message: MessageService) {}

  ngOnInit() {
    this.libraryservice.getBookProperties().subscribe(res => {
      console.log(res);
      this.authors = res.authors;
      this.book_subjects = res.subjects;
      this.book_ddc = res.ddc;
      this.book_subddc = res.ddc_sub;

    });

    this.bookForm = this._formBuilder.group({
     formArray: this._formBuilder.array([
     this.firstFormGroup = this._formBuilder.group({
      book_name: ['', Validators.required ],
      author_name: ['', Validators.required ],
      book_subtitle: ['', Validators.required ],
      book_category: ['', Validators.required],
      book_price: ['', Validators.required],
      rack_no: ['', Validators.required],
      }),
    // this.secondFormGroup = this._formBuilder.group({
    this.secondFormGroup = this._formBuilder.group({
      book_call_no: ['', ],
      book_isbn: ['', ],
      bill_number: ['', ],
      book_bill_date: ['', ],
      book_language: ['', ],
      book_ddc: ['',  ],
      sub_ddc: ['',  ],
      book_subject: ['',  ],
     }),
    // this.thirdFormGroup = this._formBuilder.group({
    this.thirdFormGroup = this._formBuilder.group({
      book_edition: ['', ],
      book_pub_date: ['', ],
      book_year: ['', ],
      supplier: ['', ],
      book_volume: ['', ],
      book_imprint: ['', ],
      book_pages: ['', ],
      series: ['', ],
      book_fund: ['', ],
      book_remarks: ['', ],
       })
       ])
    });
    this.authorform = this._formBuilder.group({
      author_name: ['', Validators.required],
      nick_name: ['', Validators.required],
    });
    this.filteredOptions = this.firstFormGroup.get('author_name').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.author_name),
        map(author_name => author_name ? this._filter(author_name) : this.authors.slice())
      );
        //
    this.filteredDdc = this.secondFormGroup.get('book_ddc').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.title),
          map(title => title ? this._filterDdc(title) : this.book_ddc.slice())
        );
   this.filteredSubjects = this.secondFormGroup.get('book_subject').valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.boo_subject),
            map(subject => subject ? this._filterSubject(subject) : this.book_subjects.slice())
          );
  }
  private _filterSubject(value: string): BookSubject[] {
    const filterValue = value.toLowerCase();
    return this.book_subjects.filter(subject => subject.book_subject.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterDdc(value: string): Ddc[] {
    const filterValue = value.toLowerCase();
    return this.book_ddc.filter(ddc => ddc.title.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filter(value: string): Author[] {
   const filterValue = value.toLowerCase();
   return this.authors.filter(option => option.author_name.toLowerCase().indexOf(filterValue) === 0);
  }
  displayFn(author?: Author): string | undefined {
    return author ? author.author_name : undefined;
  }
  disDdc(ddc?: Ddc): string |undefined {
    return ddc ? ddc.title : undefined;
  }
  disSubject(subject?: BookSubject): string |undefined {
    return subject ? subject.book_subject : undefined;
  }

 form() {
    console.log(this.bookForm.value.formArray);
     this.libraryservice.addBooks(this.bookForm.value.formArray).subscribe(res => {
     console.log(res.success);
     if (res.success) {
      this.message.showNotification('success', 'Book Created With ID :' + res.book_id);
     }
   });
 }
 getauthors() {
  this.libraryservice.getAuthor().subscribe((data: any) => {
    this.authors = data.authors;
  });
}
 onAddAuthor() {
  if (this.authorform.invalid) {
   return;
  }
  this.libraryservice.addAuthor(this.authorform.value)
  .subscribe((res: any) => {
  console.log(res);
  this.getauthors();
   this.firstFormGroup.patchValue({author_name: res.author});
  // this.('#modal').modal('hide');
  this.authorform.reset();
    $('#authormodel').modal('hide');
  });

}

}
