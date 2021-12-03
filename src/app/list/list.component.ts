import { Component, OnInit } from '@angular/core';
import { TaskService } from '../core/services/task.service';
import { Task } from '../core/models/task.model';

@Component({
  selector: 'dashboard-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.findTasks();
  }

  findTasks() {
    this.taskService
      .findAll()
      .subscribe((tasks: Task[]) => (this.tasks = tasks));
  }
}
