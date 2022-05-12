import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export let animateScores = trigger('animateScores', [
  transition(':enter, :increment, :decrement', [
    query('.player-score', stagger(175, [
      style({ transform: 'scale(2.5) translateY(-20px)', opacity: '0' }),
      animate('1s ease-out'),
    ]), {optional: true}),
  ]),
]);
