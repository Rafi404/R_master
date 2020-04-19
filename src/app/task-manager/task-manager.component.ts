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

export interface RoastElement {
  task_name: string;
  description: string;
  hour: string;
  staff_name: string;
  worked_date: string;
  status: string;
}

export interface AssignElement {
  task_name: string;
  description: string;
  planned_hours: string;
  task_manager_id: string;
  start_date: string;
  status: string;
}
interface status {
  value: number;
  viewValue: string;
}

interface staff {
  staff_id: number;
  staff_name: string;
}

// const TASK_DATA: TaskElement[] = [
//   { task_name: "5238", description: 'Front Design', planned_hours: '1:30', task_manager_id: 'Shaheer', start_date: '05/04/2020', status: 'Completed' },
// ];
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  statuses: status[] = [
    { value: 0, viewValue: 'Open' },
    { value: 1, viewValue: 'Close' },
  ];
  displayedColumns: string[] = ['no', 'task_name', 'description', 'planned_hours', 'task_manager_id', 'start_date', 'status'];
  taskSource = new MatTableDataSource();

  displayedColumns2: string[] = ['no', 'task_name', 'description', 'hour', 'staff_name', 'worked_date', 'status', 'action'];
  roasterSource = new MatTableDataSource();

  displayedColumns3: string[] = ['no', 'task_name', 'description', 'planned_hours', 'task_manager_id', 'start_date', 'action'];
  assignSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  TaskFormGroup: any;
  DutyRoasterFormGroup: any;
  arrival_stations: any;
  staff_names: any;
  live_projects: any;
  show_add_task: boolean;
  constructor(private formBuilder: FormBuilder, private taskman: TaskManagerService,
    private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit() {
    this.show_add_task=false;
    this.getStaffList();
    this.getLiveProjects();
    this.getTaskTableList();
    this.getDutyList();
    this.taskSource.sort = this.sort;
    //Form Groups====================================
    this.TaskFormGroup = this.formBuilder.group({
      task_name: ['', Validators.required],
      project_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators],
      description: ['', Validators.required],
      task_manager_id: ['1', Validators.required],
      status: ['', Validators.required],
      planned_minutes: ['', Validators.required],
      // planned_hour:['', Validators.required ],
      // minute_part:['', [Validators.required,Validators.min(0),Validators.max(59)]],
    });

    this.DutyRoasterFormGroup = this.formBuilder.group({
      staff_name: ['', Validators.required],
      task_name: ['', Validators.required],
      subjects: ['', Validators.required],
      worked_date: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required],
    })
  }
  getDutyList() {
    this.taskman.onGetDutyList().subscribe((res: any) => {
      console.log(res);
      this.roasterSource=new MatTableDataSource(res.data);
    });
  }
  getTaskTableList() {
    this.taskman.onGetTask().subscribe((res: any) => {
      console.log(res);
      this.taskSource=new MatTableDataSource(res.data);
    });
  }
  getLiveProjects() {
    this.taskman.onGetLiveProject().subscribe((res: any) => {
      console.log(res);
      this.live_projects = res.data;
    })
  }
  getStaffList() {
    this.taskman.onGetStaff().subscribe((res: any) => {
      console.log(res);
      this.staff_names = res.data;
    });
  }
  get l() {
    return this.TaskFormGroup.controls;
  }
  OnSubmitTask() {
    console.log(this.TaskFormGroup.value);
    const s_date = this.datePipe.transform(this.l.start_date.value, 'yyyy-MM-dd');
    const e_date = this.datePipe.transform(this.l.end_date.value, 'yyyy-MM-dd');
    this.TaskFormGroup.patchValue({
      start_date: s_date,
      end_date: e_date,
    });
    console.log(this.TaskFormGroup.value);
    this.taskman.onAddTask(this.TaskFormGroup.value).subscribe((res: any) => {
      console.log(res);
      this.toastr.success("Details Updated !")
      this.TaskFormGroup.reset();
    });

  }
  onTaskSearch(event) {
    console.log(event);
    this.taskman.onGetTaskList(event).subscribe((res: any) => {
    console.log(res);
    this.taskSource = new MatTableDataSource(res.data);
    });
  }

  onTaskSearch2(event) {
    console.log(event);
    this.taskman.onGetTaskList(event).subscribe((res: any) => {
    console.log(res);
    this.roasterSource=new MatTableDataSource(res.data);
    });
  }

  onTaskSearch3(event) {
    console.log(event);
    this.taskman.onGetTaskList(event).subscribe((res: any) => {
    console.log(res);
    this.assignSource=new MatTableDataSource(res.data);
    });
  }
  OnSubmitDuty() {
    this.taskman.onAddDuty(this.DutyRoasterFormGroup.value).subscribe((res: any) => {
      console.log(res);

    })

  }

  showTask(){
    this.show_add_task=!this.show_add_task;
  }

}
