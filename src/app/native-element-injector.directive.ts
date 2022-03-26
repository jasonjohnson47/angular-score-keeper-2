import { Directive, ElementRef, Optional } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';

@Directive({
  selector: '[ngModel], [formControl]', // or 'input, select, textarea' - but then your controls won't be handled and also checking for undefined would be necessary
})
export class NativeElementInjectorDirective {
  constructor(private el: ElementRef, private control : NgControl, @Optional() private model : NgModel) {
      if (!! model)
          (<any>model.control).nativeElement = el.nativeElement;
      else
          (<any>control).nativeElement = el.nativeElement;
  }
}
