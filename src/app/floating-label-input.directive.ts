import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFloatingLabelInput]'
})
export class FloatingLabelInputDirective {

  constructor() { }

  focus = false;

  @HostListener('focus')
  onFocus() {
    this.focus = true;
  }

  @HostListener('blur')
  onBlur() {
    this.focus = false;
  }

}
