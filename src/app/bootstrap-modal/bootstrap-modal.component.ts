import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bootstrap-modal',
  templateUrl: './bootstrap-modal.component.html',
  styleUrls: ['./bootstrap-modal.component.css']
})
export class BootstrapModalComponent {
  @Input() title = '';
  @Input() message = '';
  show = false;

  open(title: string, message: string): void {
    this.title = title;
    this.message = message;
    this.show = true;
  }

  close(): void {
    this.show = false;
  }
}
