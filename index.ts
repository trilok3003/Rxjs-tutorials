import {
  forkJoin,
  from,
  fromEvent,
  Observable,
  of,
  scan,
  takeUntil,
  takeWhile,
  zip,
} from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { first, last, map } from 'rxjs/operators';
/**
 * Create Observables
 */
const observable = Observable.create((observer) => {
  observer.next('hello');
  observer.next('world');
});

observable.subscribe((val) => console.log(val));

/**
 * Observable from DOM Events
 */

const clicks = fromEvent(document, 'click');

clicks.subscribe((click) => console.log(click));

/**
 * Observable from Promise
 */

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolved!');
  }, 1000);
});

const obsvPromise = fromPromise(promise);

obsvPromise.subscribe((result) => console.log(result));
/**
 * Observable Timer
 */

//  const timer = timer(1000)

//  timer.subscribe(done => console.log('ding!!!'))

/**
 * Observable Time Interval
 */

//  const interval = interval(1000)

//  interval.subscribe(i => console.log( i ))

/**
 * Observable of Static Values
 */

const mashup = of('anything', ['you', 'want'], 23, true, { cool: 'stuff' });

mashup.subscribe((val) => console.log(val));

/**
 * Unsubscribe - Turn off the stream
 */

// const timer = timer(1000);

// timer
//   .finally(() => console.log('All done!'))
//   .subscribe()

//   const interval = interval(1000);
// interval
//   .finally(()  => console.log('All done!'))
//   .subscribe(x => console.log(x))

//   const subscription = interval.subscribe()

// subscription.unsubscribe()

/**
 * Hot vs Cold Observables
 * Cold : start emitting or creating values only when the subscription starts
 * Hot: are always being updated with new values, like a live stream on YouTube
 */

// Cold Observable
const cold = Observable.create((observer) => {
  observer.next(Math.random());
});

cold.subscribe((a) => console.log(`Subscriber A: ${a}`));
cold.subscribe((b) => console.log(`Subscriber B: ${b}`));

// Hot Observable

const x = Math.random();

const hot = Observable.create((observer) => {
  observer.next(x);
});

hot.subscribe((a) => console.log(`Subscriber A: ${a}`));
hot.subscribe((b) => console.log(`Subscriber B: ${b}`));

// make cold to hot observable
// const cold1 = Observable.create( (observer) => {
//   observer.next( Math.random() )
// });

// cold1.subscribe(a => console.log(`Subscriber A: ${a}`))
// cold1.subscribe(b => console.log(`Subscriber B: ${b}`))
// const hot1 = cold1.publish()

// hot1.subscribe(a => console.log(`Subscriber A: {a}`))
// hot1.subscribe(b => console.log(`Subscriber B: {b}`))

// hot1.connect();

/**
 * Map
 */

const numbers = from([10, 100, 1000]);
numbers.pipe(map((num) => Math.log(num))).subscribe((x) => console.log(x));

/**
 * MapTo
 */
// using map json to js
//  apiCall
//  .map(json => JSON.parse(json) )
//  .subscribe()

/**
 * Do
 */

//  const names = of('Simon', 'Garfunkle')

//  names
//    .do(name  => console.log('original value', name) )
//    .map(name => name.toUpperCase() )
//    .do(name  => console.log('uppercase value', name) ).subscribe()
/**
 * Filter
 */

//  const tweet = of(arrayOfTweetObjects)

//  tweet
//    .filter(tweet => tweet.user == '@angularfirebase' )
//    .subscribe()

/**
 * First, Last
 */

const names = of('Richard', 'Erlich', 'Dinesh', 'Gilfoyle');

names.pipe(first()).subscribe((n) => console.log(n));
// Richard

names.pipe(last()).subscribe((n) => console.log(n));
// Gilfoyle
/**
 * Debounce and Throttle
 */
//  Throttle - Give me the first value, then wait X time.
// Debounce - Wait X time, then give me the last value.

// const mouseEvents = fromEvent(document, 'mousemove')

// mouseEvents.pipe(throttleTime(1000))
//   .subscribe()

// mouseEvents
//   .debounceTime(1000)
//   .subscribe()

/**
 * Scan
 */

const clicks1 = fromEvent(document, 'click');

clicks1
  .pipe(
    map((e) => Math.random() * 100),
    scan((totalScore, current) => totalScore + current)
  )
  .subscribe(console.log);

/**
 * SwitchMap - Get value from Observable A, then emit Observable B
 *  similar operators mergeMap and concatMap
 */

// const clicks2 = fromEvent(document, 'click')

// clicks.pipe(switchMap(click => {
//     return interval(500))
// })
// .subscribe(i => print(i))

/**
 * TakeUntil
 */

//  const interval = interval(500)
//  const notifier = timer(2000)

//  interval.pipe(takeUntil(notifier),
//    finally(()  => print('Complete!'))
//    .subscribe(i => print(i))

/**
 * TakeWhile
 */

//  const names2 = of('Sharon', 'Sue', 'Sally', 'Steve')

//  names2.pipe(takeWhile(name => name != 'Sally'),
//    finally(()  => console.log('Complete! I found Sally')))
//    .subscribe(i => console.log(i))

/**
 * Zip
 */

const yin = of('peanut butter', 'wine', 'rainbows');
const yang = of('jelly', 'cheese', 'unicorns');

const combo = zip(yin, yang);

combo.subscribe((arr) => console.log(arr));

/**
 * ForkJoin
 */

//  let yin1   = of('peanut butter', 'wine','rainbows')
//  let yang1  =of('jelly', 'cheese', 'unicorns')

//  yang1 = yang1.pipe(delay(2000))

//  const combo1 = forkJoin(yin, yang)

//  combo.subscribe( arr => console.log(arr) )
/**
 * Catch
 */

//  const observable1 = Observable.create( observer => {
//   observer.next( 'good' )
//   observer.next( 'great' )
//   observer.next( 'grand' )

//   throw 'catch me!'

//   observer.next( 'wonderful' )
// })

// observable1
//   .catch( err => print(`Error caught: ${err}`) )
//   .subscribe( val => console.log(val) )

/**
 * Retry
 */

//  observable
//  .catch( err => print(`Error caught: ${err}`) )
//  .retry(2)
//  .subscribe()

/**
 * retryWhen
 */
//  observable
//  .catch( err => print(`Error caught: ${err}`) )
//  .retryWhen(err => err.message === 'server overload please try again' )
//  .subscribe()

/**
 * Subject - An Observable that talks to subscribers
 */

//  const subject = new Rx.Subject()

//  const subA = subject.subscribe( val => print(`Sub A: ${val}`) )
//  const subB = subject.subscribe( val => print(`Sub B: ${val}`) )

//  subject.next('Hello')

//  setTimeout(() => {
//      subject.next('World')
//  }, 1000)
