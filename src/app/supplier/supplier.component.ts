import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { SupplierAddService } from '../services/supplier_add.service';  
import { subscribeOn } from 'rxjs/operators';
import { error } from 'protractor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GetStockService } from 'app/services/get-stock.service';
import { ToastrService } from 'ngx-toastr';

export interface SupplierData {
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

// const ELEMENT_DATA: PeriodicElement[] = [
//   {no: 1, sup_name: 'Sajid', sup_company: 'EXADE', mobile: '8848096976', email: 'saji@gmail.com', add1:'dfvdh', add2:'sdgdfd', city:'Kalpetta', state:'Kerala', po:'6731452'},
//   {no: 2, sup_name: 'SAM', sup_company: 'MARK1', mobile: '4512874512', email: 'sam@gmail.com', add1:'dfvddgh', add2:'sdgddfdfd', city:'kannur', state:'Kerala', po:'6734522'},
//   {no: 3, sup_name: 'SHAHEER', sup_company: 'NEXA', mobile: '45454543333', email: 'shaheer@gmail.com', add1:'dfdfvgh', add2:'sdgdgfd', city:'calicut', state:'Kerala', po:'6731245'},
//   {no: 4, sup_name: 'ATHIL', sup_company: 'ARCADE', mobile: '5556789976', email: 'athil@gmail.com', add1:'dfvdfdgh', add2:'sdgdf', city:'eranakulam', state:'Kerala', po:'673127'},
//   {no: 5, sup_name: 'ARSALAN', sup_company: 'MATHDOT', mobile: '4456654655', email: 'arsalan@gmail.com', add1:'dfvdfggh', add2:'sfgdgfdfd', city:'calicut', state:'Kerala', po:'67312752'},
//   {no: 6, sup_name: 'FIROS', sup_company: 'EXADE', mobile: '5656456556', email: 'firos@gmail.com', add1:'dfdfsvdgh', add2:'sdgdgfd', city:'trissur', state:'Kerala', po:'6731422'},
// ];

@Component({
  selector: 'app-supplier',  
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  // displayedColumns: string[] = ['no', 'supplier_name', 'company_name', 'mobile', 'email', 'address1', 'address1', 'city_id', 'state', 'po','edit'];
  displayedColumns: string[] = ['no', 'supplier_name', 'company_name', 'mobile', 'email', 'address1', 'address2'];
  

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  dataSource = new MatTableDataSource<SupplierData>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  sup_add:FormGroup;
  supplier_edit:FormGroup;

  constructor(private form_builder:FormBuilder, private supplier:SupplierAddService, private toast:ToastrService) { }

  ngOnInit() {
    this.getSupplier();
    this.dataSource.sort = this.sort;
    this.sup_add =this.form_builder.group({
      supnm:["",Validators.required],
      supcom:["",Validators.required],
      supmob:["",Validators.required],
      supmail:["",Validators.email],
      supadd1:["",Validators.required],
      supadd2:["",Validators.required],
      supcty:["",Validators.required],
      supstate:["",Validators.required],
      suppo:["",Validators.required],
    });
    this.supplier_edit=this.form_builder.group({
      edit_suppliername:["",Validators.required],
      edit_company:["",Validators.required],
      edit_Mobile:["",Validators.required],
      edit_mail:["",Validators.email],
      edit_add1:["",Validators.required],
      edit_add2:["",Validators.required],
      edit_cty:["",Validators.required],
      edit_state:["",Validators.required],
      edit_po:["",Validators.required],
    });
      // this.supplier.getSupplier().subscribe((res:any)=>{
      //   console.log(res);
      //   this.dataSource=new MatTableDataSource(res.supplierdata);
      // });
  }
  getSupplier() {
    this.supplier.getSupplier().subscribe((res:any)=>{
      console.log(res);
      this.dataSource=new MatTableDataSource(res.supplierdata);
      this.dataSource.sort = this.sort;

    });
  }
  onOpenModal(element) {
    console.log(element);
    this.supplier_edit.patchValue({
      edit_suppliername: element.sup_name,
      edit_company: element.sup_company,
      edit_Mobile: element.mobile,
      edit_mail: element.email,
      edit_add1: element.add1,
      edit_add2: element.add2,
      edit_cty: element.city,
      edit_state: element.state,
      edit_po: element.po,
    })
  }
  OnSubmitsup(){
    console.log(this.sup_add.value);
    this.supplier.register(this.sup_add.value).subscribe(res=>{
      console.log(res);
      if(res.success)
      {
        this.toast.success(res.message);
      }
        else
        {
        this.toast.warning(res.message);
      }
      this.sup_add.reset();
       this.getSupplier();

    });
  }
  onEditSupplier(){
    
  }
}
