import { Injectable } from '@angular/core';
import { FilterStatus, Task, TasksStatus } from '../interfaces/todolist.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Marks this service as available in the root injector
})
export class TasksService {
  private tasks: Task[] = []; // Internal array to hold the tasks
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks); // Observable to emit task updates
  public filterSubject = new BehaviorSubject<FilterStatus>('all'); // Observable to track the current filter status

  constructor() {
    this.loadFromLocalStorage(); // Load tasks from localStorage when the service is initialized
    this.setupFiltering(); // Set up the task filtering logic
  }

  // Method to add a new task
  public addTask(newTask: Task) {
    this.tasks.push(newTask); // Add the new task to the internal array
    this.update(); // Update the observable and localStorage
  }

  // Method to remove a task by its ID
  public removeTask(taskId: Task['id']) {
    this.tasks = this.tasks.filter((todoList) => todoList.id !== taskId); // Filter out the task with the given ID
    this.update(); // Update the observable and localStorage
  }

  // Sets up the task filtering logic
  private setupFiltering() {
    this.filterSubject.subscribe((status) => {
      const filteredTodos =
        status === 'all'
          ? this.tasks // If the filter is "all", use the full task list
          : this.tasks.filter((todo) => todo.status === status); // Otherwise, filter by the given status
      this.tasksSubject.next(filteredTodos); // Emit the filtered task list
    });
  }

  // Method to retrieve the tasks as an observable
  public getTask(): Observable<Task[]> {
    return this.tasksSubject.asObservable(); // Return the observable for tasks
  }

  // Method to change the status of a task by its ID
  public changeTaskStatus(taskId: Task['id'], newStatus: TasksStatus) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId); // Find the index of the task
    if (taskIndex === -1) return; // If the task is not found, do nothing
    this.tasks[taskIndex].status = newStatus; // Update the task's status
    this.update(); // Save the changes and emit the updated task list
  }

  // Load tasks from localStorage
  private loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks'); // Retrieve tasks from localStorage
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks); // Parse and set the tasks if they exist
    }
  }

  // Method to update an existing task
  public updateTask(updatedTask: Task): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === updatedTask.id); // Find the task by its ID
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask }; // Merge the updated data with the existing task
      this.update(); // Save the changes to localStorage and emit the updated task list
      return true; // Return true if the update was successful
    }
    return false; // Return false if the task was not found
  }

  // Method to emit task updates and save them to localStorage
  private update() {
    this.tasksSubject.next(this.tasks); // Emit the updated task list
    this.updateLocalStorage(); // Save the changes to localStorage
  }

  // Method to save the tasks to localStorage
  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Serialize the task list and save it to localStorage
  }
}
