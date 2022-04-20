import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-sub-toggle',
  templateUrl: './add-sub-toggle.component.html',
  styleUrls: ['./add-sub-toggle.component.css'],
})
export class AddSubToggleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() id!: string;
  @Input() btnClass: string = '';
  @Input() currOperation!: string;
  @Output() toggleAddSub = new EventEmitter<string>();

  handleAddSubBtn(currOperation: string) {
    const newOperation = currOperation == 'add' ? 'subtract' : 'add';
    this.currOperation = newOperation;
    this.toggleAddSub.emit(newOperation);
  }
}
