import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/todolist.interfaces';
import { CommonModule } from '@angular/common';
import { TodoListItemComponent } from "../todo-list-item/todo-list-item.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule,TodoListItemComponent], 
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'] 
})
export class TodoListComponent {
  @Input() todoList?: Task[] | null;
}
