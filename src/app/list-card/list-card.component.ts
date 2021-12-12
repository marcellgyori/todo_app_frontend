import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../core/models/task.model';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'dashboard-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  value = '';
  switch = false;
  @Input()
  task: Task = new Task();

  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  delete() {
    this.taskService.deleteTask(this.task).subscribe((response) => {
      response
        ? this.openSnackBar(`${this.task.title} deleted successfully`)
        : this.openSnackBar(`Can't delete ${this.task.title}`);
      window.location.reload();
    });
  }

  editTask(value: string) {
    let oldTitle = this.task.title;
    this.task.title = value;
    this.taskService.updateTask(this.task).subscribe((response) => {
      response
        ? this.openSnackBar(
            `${oldTitle} successfully changed to ${this.task.title}`
          )
        : this.openSnackBar(`Can't edit ${this.task.title}`);
      this.switch = false;
      this.value = '';
    });
  }

  updateDone() {
    this.task.isDone = !this.task.isDone;
    this.taskService.updateTask(this.task).subscribe((response) => {
      response
        ? this.openSnackBar(`${this.task.title} isDone changed successfully`)
        : this.openSnackBar(`Can't edit ${this.task.title}`);
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', { duration: 4000 });
  }
}
