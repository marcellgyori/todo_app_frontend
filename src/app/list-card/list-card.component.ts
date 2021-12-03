import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  delete() {
    this.taskService.deleteTask(this.task).subscribe(() => location.reload());
  }

  editTask(value: string) {
    this.task.title = value;
    this.taskService.updateTask(this.task).subscribe(() => {
      this.switch = false;
      this.value = '';
    });
  }

  updateDone() {
    this.task.isDone = !this.task.isDone;
    this.taskService.updateTask(this.task).subscribe(() => {});
  }
}
