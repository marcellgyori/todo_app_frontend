import { Component, OnInit } from '@angular/core';
import { Task } from '../core';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'dashboard-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  value = '';
  constructor(private taskService: TaskService) {}
  ngOnInit() {}

  createTask(title: string) {
    let task = new Task();
    task.title = title;
    this.taskService.createTask(task).subscribe(() => {
      this.value = '';
      location.reload();
    });
  }
}
