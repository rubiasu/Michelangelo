/* https://gist.github.com/1Marc/09e739caa6a82cc176ab4c2abd691814#file-reactive-js-L5 */
// Credit Ryan Carniato https://frontendmasters.com/courses/reactivity-solidjs/

let context = [];

export function untrack(fn) {
    const prevContext = context;
    context = [];
    const res = fn();
    context = prevContext;
    return res;
}

function cleanup(observer) {
    for (const dep of observer.dependencies) {
        dep.delete(observer);
    }
    observer.dependencies.clear();
}

function subscribe(observer, subscriptions) {
    subscriptions.add(observer);
    observer.dependencies.add(subscriptions);
}

export function createSignal(value) {
    const subscriptions = new Set();

    const read = () => {
        const observer = context[context.length - 1]
        if (observer) subscribe(observer, subscriptions);
        return value;
    }
    const write = (newValue) => {
        value = newValue;
        for (const observer of [...subscriptions]) {
            observer.execute();
        }
    }

    return [read, write];
}

export function createEffect(fn) {
    const effect = {
        execute() {
            cleanup(effect);
            context.push(effect);
            fn();
            context.pop();
        },
        dependencies: new Set()
    }

    effect.execute();
}

export function createMemo(fn) {
    const [signal, setSignal] = createSignal();
    createEffect(() => setSignal(fn()));
    return signal;
}


/* Usage Example
import { createSignal, createEffect, createMemo, untrack } from "./reactive";

const [count, setCount] = createSignal(0);
const [count2, setCount2] = createSignal(2);
const [show, setShow] = createSignal(true);

const sum = createMemo(() => count() + count2());

createEffect(() => {
  console.log(count(), count2(), sum());
  console.log(untrack(() => count()));
}); // 0

setShow(false);
setCount(10);

*/