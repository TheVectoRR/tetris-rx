import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from'

let numbers:string[] = ["hello world", "hello tetris"];
let source = Observable.from(numbers);

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);

