import {
  Component,
  ContentChild,
  Input
} from '@angular/core';
import { FloatingLabelInputDirective } from '../floating-label-input.directive';

@Component({
  selector: 'app-floating-label-input',
  templateUrl: './floating-label-input.component.html',
  styleUrls: ['./floating-label-input.component.css'],
})
export class FloatingLabelInputComponent {
  constructor() {}

  @Input() inputValue!: string;

  @ContentChild(FloatingLabelInputDirective)
  input!: FloatingLabelInputDirective;

  get focus() {
    return this.input ? this.input.focus : false;
  }

  get classes() {
    let cssClasses = ['floating-label'];

    if (this.inputValue != '') {
      cssClasses = ['floating-label', 'is-floating'];
    }

    if (this.focus) {
      cssClasses = ['floating-label', 'is-floating', 'has-focus'];
    }

    return cssClasses;
  }

}
