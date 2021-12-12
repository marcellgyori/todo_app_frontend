import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../core';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  value = '';
  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {}

  createTask(title: string) {
    let task = new Task();
    task.title = title;
    this.taskService.createTask(task).subscribe((response: any) => {
      response ? this.openSnackBar(`Task is successfully created`) : '';
      this.value = '';
      location.reload();
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', { duration: 4000 });
  }
}
