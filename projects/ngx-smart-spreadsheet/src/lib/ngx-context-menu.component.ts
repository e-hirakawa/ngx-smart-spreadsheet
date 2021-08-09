import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Output, QueryList, ViewChild } from '@angular/core';
import { NgxContextMenuItemComponent } from './ngx-context-menu-item.component';

@Component({
  selector: 'ngx-context-menu',
  templateUrl: './ngx-context-menu.component.html',
  styleUrls: ['./ngx-context-menu.component.scss']
})
export class NgxContextMenuComponent {
  @ViewChild('menu', { static: true })
  menuElementRef!: ElementRef<HTMLElement>;

  @ContentChildren(NgxContextMenuItemComponent)
  itemTemplates!: QueryList<NgxContextMenuItemComponent>;

  @Output()
  closed = new EventEmitter();

  target: number = -1;

  public show(ev: MouseEvent, index: number): void {
    this.target = index;
    this.menuElement.style.display = 'flex';

    const menuTop = ((ev.clientY + this.menuHeight) > this.documentHeight) ?
      ev.pageY - this.menuHeight : ev.pageY + 15;
    const menuLeft = ((ev.clientX + this.menuWidth) > this.documentWidth) ?
      ev.pageX - this.menuWidth : ev.pageX;
    this.menuElement.style.top = `${menuTop}px`;
    this.menuElement.style.left = `${menuLeft}px`;
  }

  @HostListener('document:click', ['$event'])
  click(): void {
    this.menuElement.style.display = 'none';
    this.closed.emit();
  }

  private get menuElement(): HTMLElement {
    return this.menuElementRef.nativeElement;
  }

  private get menuStyle(): CSSStyleDeclaration {
    return getComputedStyle(this.menuElement);
  }

  private get menuWidth(): number {
    return this.menuElement.offsetWidth +
      parseInt(this.menuStyle.marginLeft) + parseInt(this.menuStyle.marginRight) +
      parseInt(this.menuStyle.paddingLeft) + parseInt(this.menuStyle.paddingRight);
  }

  private get menuHeight(): number {
    return this.menuElement.offsetHeight +
      parseInt(this.menuStyle.marginTop) + parseInt(this.menuStyle.marginBottom) +
      parseInt(this.menuStyle.paddingTop) + parseInt(this.menuStyle.paddingBottom);
  }

  private get documentWidth(): number {
    return document.documentElement.clientWidth;
  }

  private get documentHeight(): number {
    return document.documentElement.clientHeight;
  }

}
