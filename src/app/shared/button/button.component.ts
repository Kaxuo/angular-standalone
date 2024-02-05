import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() counterC: number;
  @Output() increm: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    console.log(this.counterC);
  }

  increment() {
    this.counterC += 1;
    this.increm.emit(this.counterC);
  }
}
