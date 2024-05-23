import {Component, ElementRef, ViewChild, signal} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  show$ = signal<boolean>(false);
  @ViewChild('simpleDialog') dialog: ElementRef<HTMLDialogElement>;

  showModal() {
    this.dialog.nativeElement.showModal();
  }

  closeModal() {
    this.dialog.nativeElement.close();
  }

  event(e: Event) {
    const html = e.target as HTMLElement;
    html.className == 'modal' && this.closeModal();
  }
}
