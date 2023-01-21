export * from "supermutant";

import { useRerender } from "@hmans/use-rerender";
import { useEffect, useState } from "react";
import { onMutate } from "supermutant";

export function useMutant<T>(subject: T): T;

export function useMutant<T, U>(subject: T, selector: (subject: T) => U): U;

export function useMutant<T, U>(subject: T, selector?: (subject: T) => U) {
  const rerender = useRerender();

  const [value, setValue] = useState(() =>
    selector ? selector(subject) : subject
  );

  /* Let this component know when the subject is updated. */
  useEffect(
    () =>
      onMutate(subject).subscribe((subject) => {
        if (selector) {
          const newValue = selector(subject);
          if (newValue !== value) {
            setValue(newValue);
            rerender();
          }
        } else {
          rerender();
        }
      }),
    []
  );

  return selector ? selector(subject) : subject;
}
