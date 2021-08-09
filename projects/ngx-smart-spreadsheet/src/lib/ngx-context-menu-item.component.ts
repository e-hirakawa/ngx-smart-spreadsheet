import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-context-menu-item',
  template: ''
})
export class NgxContextMenuItemComponent {
  @Input()
  label?: string;
  @Input()
  disabled?: boolean;
  @Input()
  divider?: boolean;
  @Output()
  click = new EventEmitter<number>();

  clicked(index: number) {
    if (!this.disabled) {
      this.click.emit(index);
    }
  }
}
