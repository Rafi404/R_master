import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
export interface RouteElement {
  student: string;
  student_id: number;
  student_name: string;
  batch: string;
  station:string;
  charge:number;
}
export interface StudentElement {
  student_id: number;
  student_name: string;
  term: number;
}

export interface AddStudentElement {
  student: string;
  station: string;
  charge: number;
}
interface route{
  value: number;
  viewValue: string;
}

interface station{
  value: number;
  viewValue: string;
}
interface batch{
  value: number;
  viewValue: string;
}
const ACTIVE_ROUTES: RouteElement[] = [
  {student: 'Nishad', student_id: 12, student_name: 'Nishad', batch: 'BBA-2018-2020', station: 'College stop', charge: 6500},
  {student: 'Sam', student_id: 14, student_name: 'Sam', batch: 'BCA-2018-2020', station: 'Mananthavady stop', charge: 5000},
];

const STUDENTS: StudentElement[] = [
  {student_id: 1,student_name: 'Nishad', term: 6},
  {student_id: 2,student_name: 'Ansiya', term: 4},
];

const ADD_STUDENTS: AddStudentElement[] = [
  {student: 'Nishad', station:'' ,charge: 6500},
  {student: 'Ansiya',station:'', charge: 5000},
];

@Component({
  selector: 'app-transportation-approval',
  templateUrl: './transportation-approval.component.html',
  styleUrls: ['./transportation-approval.component.scss']
})
export class TransportationApprovalComponent implements OnInit {
type:any;
  routes: route[] = [
    { value: 0, viewValue: 'Kalpetta' },
    { value: 1, viewValue: 'Mananthavady' },
    { value: 2, viewValue: 'Bathery' },
  ];

  stations: station[] = [
    { value: 1, viewValue: 'College stop' },
    { value: 2, viewValue: 'Mananthavady' },
    { value: 3, viewValue: 'Kalpetta' },
  ];
  batches: batch[] = [
    { value: 1, viewValue: 'BBA 2018-2020' },
    { value: 2, viewValue: 'BCA 2018-2020' },
    { value: 3, viewValue: 'MCA 2020-2022' },
  ];
  displayedColumns: string[] = ['no','student', 'station', 'charge', 'action'];
  ActiveSource = new MatTableDataSource(ACTIVE_ROUTES);

  displayedColumns2: string[] = ['no', 'student_id', 'student_name', 'term', 'action'];
  studentSource = new MatTableDataSource<StudentElement>(STUDENTS);
  selection = new SelectionModel<StudentElement>(true, []);

  displayedColumns3: string[] = ['no', 'student', 'station', 'charge', 'action'];
  addStudentSource = new MatTableDataSource<AddStudentElement>(ADD_STUDENTS);

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.studentSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.studentSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StudentElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.student_id + 1}`;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.ActiveSource.sort = this.sort;
  }

}
