import { Component, inject, Input } from '@angular/core';
import { Task, TasksStatus } from '../../interfaces/todolist.interfaces';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../../pipes/date.pipe';
import { TimeUntilPipe } from '../../pipes/time-until.pipe';
import { TasksService } from '../../services/tasks.service';
import { formOptions } from '../../config/options';
import { traductions } from '../../utils/traductions';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    TimeUntilPipe,
    DropdownMenuComponent,
    FormsModule,
   
    
  ],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss',
})
export class TodoListItemComponent {
  @Input() todoList?: Task;
  private tasksService = inject(TasksService);
  public statusOptions = formOptions;

  // Estado de edición
  public isEditing = false;
  // Datos de tarea en modo edición
  public editTaskData: Partial<Task> = {};

  get optionSelect() {
    return {
      value: this.todoList?.status,
      name: traductions[this.todoList?.status!],
    };
  }

  public removeTask() {
    if (!this.todoList) return;
    this.tasksService.removeTask(this.todoList.id);
  }

  public changeStatus(newStatus: { value: TasksStatus; name: string }) {
    if (this.todoList?.id && newStatus.value !== this.todoList.status) {
      this.todoList.status = newStatus.value; // Actualiza el estado en la tarea
      this.tasksService.updateTask(this.todoList); // Guarda el cambio en el servicio
    }
  }
  

  // Inicia el modo de edición
  public toggleEdit() {
    this.isEditing = !this.isEditing;

    if (this.isEditing && this.todoList) {
      // Guarda una copia de los datos actuales de la tarea cuando empieza la edición
      this.editTaskData = { ...this.todoList };
    }
  }

  // Guarda los cambios realizados en la tarea
  public saveEdit() {
    if (this.todoList && this.editTaskData) {
      // Asegúrate de que los campos obligatorios estén presentes
      const updatedTask: Task = {
        ...this.todoList,
        ...this.editTaskData, // Esto debería contener los datos editados
      };

      const success = this.tasksService.updateTask(updatedTask);

      if (success) {
        this.isEditing = false; // Sale del modo de edición si la actualización fue exitosa
      } else {
        console.error('No se pudo actualizar la tarea.');
      }
    }
  }
}
