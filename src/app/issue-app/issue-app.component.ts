import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface batch {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-issue-app',
  templateUrl: './issue-app.component.html',
  styleUrls: ['./issue-app.component.scss']
})
export class IssueAppComponent implements OnInit {

  batches: batch[] = [
    {value: '0', viewValue: 'BBA 2016-2018'},
    {value: '1', viewValue: 'BCA 2017-2020'},
    {value: '2', viewValue: 'MCA 2017-2020'}
  ];
  issue_app: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.issue_app=this.formBuilder.group({
      batch: ['',Validators.required],
      add_no: ['',Validators.required],
      date: ['',Validators.required],
      item: ['',Validators.required],
      item_no: ['',Validators.required], 
    })

  }

}
