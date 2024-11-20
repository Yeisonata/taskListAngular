import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './components/arrow/arrow.component';


@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule,ArrowComponent],
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  @Input() placeholder?: string;
  @Input() options: { name: string; value: any }[] = [];
  @Input() optionSelected?: { name: string; value: any };
  @Output() onSelect: EventEmitter<{ name: string; value: any }> = new EventEmitter();

  public open: boolean = false;

  public toggleDropdownMenu(): void {
    this.open = !this.open;
  }

  public selectOption(option: { name: string; value: any }): void {
    this.onSelect.emit(option);
    this.open = false;
  }
}
