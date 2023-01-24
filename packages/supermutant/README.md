# SUPERMUTANT!

Turn any JavaScript object into a reactive state container.

```ts
const myState = {
  counter: 0,
};
```

Subscribe to changes:

```ts
onMutate(myState).subscribe((state) => {
  console.log("Counter is:", state.counter);
});
```

Mutate the state and notify subscribers:

```ts
mutate(myState, (state) => {
  state.counter++;
});
```
