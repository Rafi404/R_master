import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskManagerService } from 'app/services/task-manager.service';
import { DatePipe } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';
export interface TaskElement {
  task_name: string;
  description: string;
  planned_hours: string;
  task_manager_id: string;
  start_date: string;
  status: string;
}
interface status{
  value: number;
  viewValue: string;
}
const TASK_DATA: TaskElement[] = [
  {task_name: "5238", description: 'Front Design', planned_hours: '1:30', task_manager_id: 'Shaheer',start_date:'05/04/2020',status:'Completed'},

];
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  statuses: status[] = [
    { value: 0, viewValue: 'Completed' },
    { value: 1, viewValue: 'Not Cmpleted' },
  ];
  displayedColumns: string[] = ['no','task_name', 'description', 'planned_hours', 'task_manager_id','start_date','status'];
  taskSource = new MatTableDataSource(TASK_DATA);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  TaskFormGroup:any;
  constructor(private formBuilder:FormBuilder, private taskman:TaskManagerService, 
  private datePipe:DatePipe, private toastr: ToastrService) { }

  ngOnInit() {
    this.taskSource.sort = this.sort;
     //Form Groups====================================
     this.TaskFormGroup = this.formBuilder.group({
      task_name: ['', Validators.required],
      project_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators],
      description:['', Validators.required],
      task_manager_id:['1', Validators.required],
      status:['', Validators.required],
      hour_part:['', Validators.required ],
      minute_part:['', [Validators.required,Validators.min(0),Validators.max(59)]],
      });
  }
  get l() {
    return this.TaskFormGroup.controls;
  }
  OnSubmitTask(){
    // console.log(this.TaskFormGroup.value);

    if(this.TaskFormGroup.invalid)  
    {
      this.toastr.warning("Enter Valid Details");
    } else{
      const s_date = this.datePipe.transform(this.l.start_date.value, 'yyyy-MM-dd');
      const e_date = this.datePipe.transform(this.l.end_date.value, 'yyyy-MM-dd');
      this.TaskFormGroup.patchValue({
        start_date: s_date,
        end_date:e_date,
      });
      console.log(this.TaskFormGroup.value);
      this.taskman.onAddTask(this.TaskFormGroup.value).subscribe((res:any)=>{
       console.log(res);
      this.toastr.success("Details Updated !")
       this.TaskFormGroup.reset();
        
      })
    }  
 
  }

}
