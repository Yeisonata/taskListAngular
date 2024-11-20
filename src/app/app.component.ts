import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './interfaces/todolist.interfaces';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TasksService } from './services/tasks.service';
import { Subscription } from 'rxjs'; // Used to manage subscriptions to observables
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root', // Root component of the application
  standalone: true, // Indicates that this component is a standalone component
  imports: [
    CommonModule, // Provides Angular common directives like ngIf and ngFor
    TodoListComponent, // Imports the TodoListComponent for displaying the list of tasks
    TaskFormComponent, // Imports the TaskFormComponent for adding tasks
    FormsModule, // Provides template-driven form functionalities
  ],
  templateUrl: './app.component.html', // Path to the component's HTML template
  styleUrl: './app.component.scss', // Path to the component's SCSS file
})
export class AppComponent {
  private tasksServicie = inject(TasksService); // Injects the TasksService to manage task-related logic
  public tasks?: Task[]; // Holds the list of tasks retrieved from the service
  private tasksSubscription: Subscription; // Manages the subscription to the task observable

  constructor() {
    // Subscribes to the observable provided by the TasksService to get the list of tasks
    this.tasksSubscription = this.tasksServicie.getTask().subscribe((tasks) => {
      this.tasks = tasks; // Updates the local tasks property when tasks change
    });
  }

  // Cleans up the subscription when the component is destroyed
  ngDestroy() {
    this.tasksSubscription.unsubscribe(); // Prevents memory leaks by unsubscribing
  }
}
