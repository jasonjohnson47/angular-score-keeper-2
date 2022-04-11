import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-floating-label-input',
  templateUrl: './floating-label-input.component.html',
  styleUrls: ['./floating-label-input.component.css'],
})
export class FloatingLabelInputComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.handleFloatingLabels();
  }

  ngOnChanges() {
    if (this.focus) {
      this.thisInput.nativeElement.focus();
    }
  }

  @ViewChild('thisInput') thisInput!: ElementRef;

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean | null = null;
  @Input() focus: boolean = false;
  @Output() blurred = new EventEmitter<HTMLInputElement>();

  containerClass = ['floating-label'];
  min = null;
  ariaDescribedby = null;
  errorMsg = null;
  hasError = null;

  handleFloatingLabels() {
    const value = ''; // TO DO

    /*if (value != '') {
      this.containerClass = ['floating-label', 'is-floating'];
    } else {
      this.containerClass = ['floating-label'];
    }*/

    this.containerClass = ['floating-label', 'is-floating'];
  }

  handleFocus() {
    this.containerClass = ['floating-label', 'is-floating', 'has-focus'];
  }

  handleBlur(thisInput: HTMLInputElement) {
    this.blurred.emit(thisInput);
    this.handleFloatingLabels();
  }
}
