import { Pipe, PipeTransform } from '@angular/core';

// Decorator that defines this pipe as "timeUntil" and allows standalone usage
@Pipe({
  name: 'timeUntil', // Name of the pipe to be used in templates
  standalone: true,  // Enables the pipe to be used independently of a specific module
})
export class TimeUntilPipe implements PipeTransform {
  
  // Main method of the pipe that transforms a given date into a relative time string
  transform(value: string | Date): string {
    let inputDate: Date;

    // Check if the value is a string and convert it to a Date object
    if (typeof value === 'string') {
      inputDate = new Date(value);
      // Return an empty string if the value is not a valid date
      if (isNaN(inputDate.getTime())) return '';
    } 
    // If the value is already a Date object, assign it directly
    else if (value instanceof Date) {
      inputDate = value;
    } 
    // Return an empty string if the value is neither a string nor a Date
    else return '';

    const now = new Date(); // Get the current date and time
    const diff = inputDate.getTime() - now.getTime(); // Calculate the difference in milliseconds
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Convert the difference to days

    // If the date is in the future, return the number of days until it is due
    if (days > 0) {
      return `Due in ${days} day${days > 1 ? 's' : ''}`;
    } 
    // If the date is today, return "Due Today"
    else if (days === 0) {
      return 'Due Today';
    } 
    // If the date is in the past, return the number of days it is overdue
    else {
      return `Overdue by ${Math.abs(days)} day${Math.abs(days) > 1 ? 's' : ''}`;
    }
  }
}
