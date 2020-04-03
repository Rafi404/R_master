import { Component, OnInit } from '@angular/core';
interface route{
  value: number;
  viewValue: string;
}
export interface ApprovalElement {
  student: string;
  station: string;
  student_id:number;
  student_name:string;
  batch:string;
}

interface station{
  value: number;
  viewValue: string;
}
const APPROVAL_DATA: ApprovalElement[] = [
  {student: 'Nishad', student_id: 12, student_name: 'Nishad', batch: 'BBA-2018-2020', station: ''},

];




@Component({
  selector: 'app-transportation-approve',
  templateUrl: './transportation-approve.component.html',
  styleUrls: ['./transportation-approve.component.scss']
})
export class TransportationApproveComponent implements OnInit {
  routes: route[] = [
    { value: 0, viewValue: 'Kalpetta' },
    { value: 1, viewValue: 'Mananthavady' },
    { value: 2, viewValue: 'Bathery' },
  ];

  stations: station[] = [
    { value: 0, viewValue: 'Collge Stop' },
    { value: 1, viewValue: 'Kalpetta' },
    { value: 2, viewValue: 'Mananthavady' },
  ];

  displayedColumns: string[] = ['no', 'student', 'station', 'charge','amount'];
  ApprovalSource = APPROVAL_DATA;
  constructor() { }

  ngOnInit() {
  }

}
