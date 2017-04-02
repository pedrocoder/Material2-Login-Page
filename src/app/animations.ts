import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInOutTrigger = trigger('fadeInOut',
    [
        transition(':enter', [   // :enter is alias to 'void => *'
            style({opacity: 0}),
            animate(700, style({opacity: 1}))
        ]),
        transition(':leave', [   // :leave is alias to '* => void'
            animate(0, style({opacity: 0}))
        ])
    ]);
