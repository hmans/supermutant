# SUPERMUTANT!

EMBRACE THE MUTATION and turn any JavaScript object into a SUPERMUTANT REACTIVE STATE CONTAINER. _UUUAAAAAHHHHHHHHHHHRRRRRR_

## Overview

Any non-primitive JavaScript object can be turned into a reactive state container. Like this one:

```ts
const myState = {
  counter: 0,
};
```

All we need to do is wrap code that mutates it in `mutate`:

```ts
mutate(myState, (s) => s.counter++);
```

Interested parties can subscribe to mutations via `onMutate`:

```ts
onMutate(myState, (s) => {
  console.log("Counter is:", s.counter);
});
```

If you're only interested in a specific property, you can pass a selector function as the third argument to `onMutate`. This will make sure the callback is only invoked when the selected property changes:

```ts
onMutate(
  myState,
  (s) => console.log("Counter is:", s.counter),
  (s) => s.counter
);
```

_UUUAAAHHHHHHHHH_

## License

```
Copyright (c) 2023 Hendrik Mans

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
