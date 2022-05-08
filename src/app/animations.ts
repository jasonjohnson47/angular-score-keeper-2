import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

export let animateNumber = trigger('animateNumber', [
  //state('void', style({ transform: 'translateY(-20px)', opacity: '0' })),
  transition(':increment, :decrement', [
      style({ transform: 'translateY(-20px)', opacity: '0' }),
      animate('750ms ease-out')
    ]),
]);
