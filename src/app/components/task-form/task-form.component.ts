import { Component, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task, TasksStatus } from '../../interfaces/todolist.interfaces';
import { traductions } from '../../utils/traductions';
import { formOptions } from '../../config/options';
import { FormsModule } from '@angular/forms';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { CommonModule } from '@angular/common';
import { TimeUntilPipe } from '../../pipes/time-until.pipe';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, DropdownMenuComponent, CommonModule, TimeUntilPipe],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  // Injecting the TasksService to interact with the task data
  private tasksService = inject(TasksService);

  // Defining the properties to bind to the form inputs
  public newTaskTitle: string = "";
  public newTaskDescription: string = "";
  
  // Initializing the task status with the first option from the formOptions
  public newTaskStatus: { value: TasksStatus; name: string } = formOptions[0];
  public statusOptions = formOptions; // This will hold all possible status options

  // Initializing the due date to the current date
  public newTaskDueDate: Date = new Date();

  // Method to add a new task
  public addTask() {
    const newTask: Task = {
      id: Math.random(), // Assigning a random ID (should ideally be handled by the backend)
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      status: this.newTaskStatus.value,
      createdAt: new Date(),
      dueDate: this.newTaskDueDate, // Setting the due date
    };
    
    // Adding the new task using the task service
    this.tasksService.addTask(newTask);

    // Clearing the form after the task is added
    this.newTaskTitle = "";
    this.newTaskDescription = "";
    this.newTaskStatus = formOptions[0]; // Resetting the task status to the first option
    this.newTaskDueDate = new Date(); // Resetting the due date to the current date
  }

  // Method to change the task status
  public changeStatus(newStatus: { value: TasksStatus, name: string }) {
    this.newTaskStatus = newStatus;
  }
}
