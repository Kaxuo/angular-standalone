import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() counterC: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() increm: EventEmitter<any> = new EventEmitter();

  increment() {
    this.counterC += 1;
    this.increm.emit(this.counterC);
  }
}
