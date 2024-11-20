import { TasksStatus } from '../interfaces/todolist.interfaces'; // Importing the TasksStatus type for type safety
import { traductions } from '../utils/traductions'; // Importing the traductions utility for translated strings

// Defining the available status options for tasks in the form
export const formOptions: { name: string; value: TasksStatus }[] = [
  { value: 'empty', name: traductions['empty'] }, // The status "empty" with its translation
  { value: 'inProgress', name: traductions['inProgress'] }, // The status "inProgress" with its translation
  { value: 'finished', name: traductions['finished'] }, // The status "finished"
];
