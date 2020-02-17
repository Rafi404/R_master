import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface PeriodicElement {
  no: number;
  sup_name: string;
  sup_company: string;
  mobile: string;
  email:string;
  add1:string;
  add2:string;
  city:string;
  state:string;
  po:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {no: 1, sup_name: 'Sajid', sup_company: 'EXADE', mobile: '8848096976', email: 'saji@gmail.com', add1:'dfvdgh', add2:'sdgdgfgfdfd', city:'Kalpetta', state:'Kerala', po:'6731452'},
  {no: 2, sup_name: 'SAM', sup_company: 'MARK1', mobile: '4512874512', email: 'sam@gmail.com', add1:'dfvddfdgh', add2:'sdgddfgfdfd', city:'kannur', state:'Kerala', po:'6734522'},
  {no: 3, sup_name: 'SHAHEER', sup_company: 'NEXA', mobile: '45454543333', email: 'shaheer@gmail.com', add1:'dfdfvdgh', add2:'sdgdgfgfdfd', city:'calicut', state:'Kerala', po:'6731245'},
  {no: 4, sup_name: 'ATHIL', sup_company: 'ARCADE', mobile: '5556789976', email: 'athil@gmail.com', add1:'dfvdfdgh', add2:'sdgdgffgdfd', city:'eranakulam', state:'Kerala', po:'673127'},
  {no: 5, sup_name: 'ARSALAN', sup_company: 'MATHDOT', mobile: '4456654655', email: 'arsalan@gmail.com', add1:'dfvdfggh', add2:'sfgdgdgfdfd', city:'calicut', state:'Kerala', po:'67312752'},
  {no: 6, sup_name: 'FIROS', sup_company: 'EXADE', mobile: '5656456556', email: 'firos@gmail.com', add1:'dfdfsvdgh', add2:'sdgdgfgfdfd', city:'trissur', state:'Kerala', po:'6731422'},

];

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  displayedColumns: string[] = ['no', 'sup_name', 'sup_company', 'mobile', 'email', 'add1', 'add2', 'city', 'state', 'po'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  sup_add:FormGroup

  constructor(private form_builder:FormBuilder) { }

  ngOnInit() {

    this.dataSource.sort = this.sort;

    this.sup_add =this.form_builder.group({
      supnm:["",Validators.required],
      supcom:["",Validators.required],
      supmob:["",Validators.required],
      supmail:["",Validators.required],
      supadd1:["",Validators.required],
      supadd2:["",Validators.required],
      supcty:["",Validators.required],
      supstate:["",Validators.required],
      suppo:["",Validators.required],
    })
  }

  OnSubmitsup(){
    console.log(this.sup_add.value);
    console
  }

}
