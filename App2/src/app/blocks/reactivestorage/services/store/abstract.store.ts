import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class Store<T> {

  private state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this.state$ = new BehaviorSubject(initialState);
  }

  public get state(): T {
    return this.state$.getValue();
  }

  public set state(nextState: T) {
    this.state$.next(nextState);
  }

  public select<S>(selectFn: (state: T) => S): Observable<S> {
    return this.state$.pipe(
      map(selectFn),
      distinctUntilChanged()
    );
  }
}