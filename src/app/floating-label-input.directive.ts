import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFloatingLabelInput]'
})
export class FloatingLabelInputDirective {

  constructor() { }

  focus = false;

  @HostListener('focus')
  onFocus() {
    console.log('on focus');
    this.focus = true;
  }

  @HostListener('blur')
  onBlur() {
    console.log('on blur');
    this.focus = false;
  }

}
