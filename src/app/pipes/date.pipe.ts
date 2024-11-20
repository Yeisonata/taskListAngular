import { Pipe, PipeTransform } from '@angular/core';

// Decorator defining this pipe as "dateFormat" and allowing standalone usage
@Pipe({
  name: 'dateFormat', // Name of the pipe to be used in templates
  standalone: true,   // Enables the pipe to be used without being part of a specific module
})
export class DatePipe implements PipeTransform {

  // Main method of the pipe that takes a value and returns a formatted string
  transform(value: string | Date): string {
    let inputDate: Date;

    // Checks if the value is a string and converts it to a Date object
    if (typeof value === 'string') {
      inputDate = new Date(value);
      // Returns an empty string if the value is not a valid date
      if (isNaN(inputDate.getTime())) return '';
    } 
    // If the value is already a Date object, assigns it directly
    else if (value instanceof Date) {
      inputDate = value;
    } 
    // Returns an empty string if the value is neither a string nor a Date
    else return '';

    // Normalizes dates to UTC by stripping hours, minutes, and seconds
    const nowtime = this.stripTimeUTC(new Date()); // Current date in UTC
    const inputTime = this.stripTimeUTC(inputDate); // Input date in UTC

    // Checks if the input date is today
    if (this.SameDay(nowtime, inputTime)) {
      return 'Today'; // Returns "Today" if it's the same day
    } 
    // Checks if the input date was yesterday
    else if (this.Yesterday(nowtime, inputTime)) {
      return 'Yesterday'; // Returns "Yesterday" if it's the previous day
    } 
    // If not today or yesterday, formats the date as "MM/DD/YYYY"
    else {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      // Returns the formatted date based on the browser's locale settings
      return inputDate.toLocaleDateString(undefined, options);
    }
  }

  // Method that normalizes a date to UTC without hours, minutes, or seconds
  private stripTimeUTC(date: Date): Date {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }

  // Method that checks if two dates are the same day
  private SameDay(date: Date, date1: Date): boolean {
    return date.getTime() === date1.getTime(); // Compares timestamps in milliseconds
  }

  // Method that checks if a date is the day before another date
  private Yesterday(date: Date, date1: Date): boolean {
    const yesterday = new Date(date);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1); // Subtracts one day from the current date
    return date1.getTime() === yesterday.getTime(); // Compares timestamps in milliseconds
  }
}
