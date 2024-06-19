import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Observable, concatMap, delay, finalize, from, mergeMap, of, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-obs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obs.component.html',
  styleUrl: './obs.component.scss',
})
export class ObsComponent {
  data: Observable<number> = from([1, 2, 3, 4, 5])
    .pipe(delay(500))
    .subscribe(x => console.log(x));
  mergeMapObs$: Observable<number>;
  concatMapObs$: Observable<number>;
  switchMapObs$: Observable<number>;

  ngOnInit() {
    // this.mergeMapObs$ = of(this.data).pipe(
    //   mergeMap(num => num),
    //   tap(v => console.log(v)),
    //   finalize(() => console.log('mergeMap Done')),
    // );
    // this.concatMapObs$ = of(this.data).pipe(
    //   concatMap(num => num),
    //   tap(v => console.log(v)),
    //   finalize(() => console.log('ConcatMap Done')),
    // );
    // this.switchMapObs$ = of(this.data).pipe(
    //   switchMap(num => num),
    //   tap(v => console.log(v)),
    //   finalize(() => console.log('Switchmap Done')),
    // );
  }

  mergeMapIncrement() {}
}
