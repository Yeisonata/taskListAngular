export interface Task {
  id: number | string;  // The task ID, which can either be a number or a string
  title: string;  // The title of the task
  description: string;  // A detailed description of the task
  createdAt: string | Date;  // The creation date of the task, which can be a string or a Date object
  dueDate: string | Date;  // The due date of the task, which can also be a string or a Date object
  status: TasksStatus;  // The status of the task, using the TasksStatus type
}

export type TasksStatus = "empty" | "inProgress" | "finished";  // The possible statuses of a task

export type FilterStatus = TasksStatus | "all";  // A type for filtering tasks, which can be a specific task status or "all"
