import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Observable, concatMap, delay, from, mergeMap, of, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-obs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obs.component.html',
  styleUrl: './obs.component.scss',
})
export class ObsComponent {
  // https://dev.to/kinginit/rxjs-mergemap-vs-switchmap-vs-concatmap-vs-exhaustmap-5gpg

  data: Observable<number> = from([1, 2, 3, 4, 5]);
  mergeMapObs$: Observable<number>;
  concatMapObs$: Observable<number>;
  switchMapObs$: Observable<number>;

  ngOnInit() {
    // mergeMap: Unlike concatMap, mergeMap does not wait for the previous call to finish. It emits all requests as they come in, processing them at the same time. However, the response order may not match the request order.

    this.mergeMapObs$ = this.operator(mergeMap);

    // concatMap: This operator creates a queue of requests and handles them one after the other. It waits for the previous call to finish before making the next one. It maintains the order of requests and creates a link between them.
    this.concatMapObs$ = this.operator(concatMap);

    // switchMap: When a bunch of values are emitted quickly, switchMap only cares about the latest one and ignores the rest. It does not wait for the previous calls to complete before making new ones.
    this.switchMapObs$ = this.operator(switchMap);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operator(operator: any): Observable<number> {
    return this.data.pipe(
      operator((item: number) => of(item).pipe(delay(1000))),
      tap(x => console.log(x)),
    );
  }
}
