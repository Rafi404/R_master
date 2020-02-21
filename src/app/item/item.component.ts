import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  item_add: FormGroup;

  types: type[] = [
    {value: '0', viewValue: 'Apparatus'},
    {value: '1', viewValue: 'Chemical'},
  ];

  constructor(private form_builder: FormBuilder) { }

  ngOnInit() {

    this.item_add=this.form_builder.group({
      items: ['',Validators.required],
      use: ['',Validators.required],
      spec: ['',Validators.required],
      type: ['',Validators.required],
      unit: ['',Validators.required], 


    })
  }

  onSubmitItem() {
    console.log(this.item_add.value);
    console
  }

}
