import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'app/services/library.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'app/services/message.service';
import {MatRadioChange} from '@angular/material';
import { error } from '@angular/compiler/src/util';
import { from } from 'rxjs';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-issuebook',
  templateUrl: './issuebook.component.html',
  styleUrls: ['./issuebook.component.scss']
})
export class IssuebookComponent implements OnInit {
  public is_issued = false;
  public issuable = false;
  selected: string;
  public issue_to: string[] = [];
  public issuedBook: string[] = [];
  public issuableBook: string[] = [];
  findform: FormGroup;
  issueform: FormGroup;
  constructor(private formbuilder: FormBuilder, private libraryservice: LibraryService, private message: MessageService) { }

  ngOnInit() {
   this.findform = this.formbuilder.group({
      book_no: ['', Validators.required],
    })
   this.issueform = this.formbuilder.group({
      issuable_id: ['', Validators.required],
      issuable_type: ['', Validators.required],
      book_id: [{value: '', disabled: true}, Validators.required],
   })
   this.issueform.get('issuable_id').valueChanges.subscribe(res => {
      this.issue_to = [];
      if (this.issueform.get('issuable_type').value === 'student' ) {
        this.libraryservice.getStudent(res).subscribe((result: any) => {
            if (result) {
              console.log(result);
              this.issue_to = result.student;
              this.issue_to['books_issued'] = result.count;
            }
        });
      } else
      if (this.issueform.get('issuable_type').value === 'staff') {
        this.libraryservice.getStaff(res).subscribe((result: any) => {
          if (result) {
            console.log(result)
            this.issue_to = result.staff;
            this.issue_to['books_issued'] = result.count;
          }
        });
      }
   });
  }
  onfind() {
    if (this.findform.invalid) {
    return;
    }
    this.libraryservice.isIssued(this.findform.get('book_no').value).subscribe((res: any) => {
        if (res.issued) {
        this.issuable = false;
        this.is_issued = true ;
        this.issuedBook = res.issued_book[0];
        this.issuedBook['fine'] = res.fine;
        } else {
           if  (res.book) {
            this.is_issued = false;
            this.issuable = true;
            this.issuableBook = res.book;

          }
        }
    }, _error => {
      this.message.showNotification('danger', 'Book Not Found');
    });
  }
 onIssue() {
  if (this.issueform.invalid) {
  return;
  }
  this.libraryservice.issueBook(this.issueform.getRawValue()).subscribe((res: any) => {
  //  console.log(res);
   if (res.success) {
    this.issuable = false;
   this.message.showNotification('success', res.message);
   } else {
      this.message.showNotification('danger', res.message);
   }
  });
 }
onReturn(id) {
this.libraryservice.returnBook(id).subscribe((res: any) => {
this.is_issued = false;
this.message.showNotification('success', res.message);
console.log(res);
});

}

}
