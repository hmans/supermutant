import { useRerender } from "@hmans/use-rerender";
import { useEffect } from "react";
import { onMutate } from "supermutant";

export function useMutant<T>(subject: T): T;

export function useMutant<T, U>(subject: T, selector: (subject: T) => U): U;

export function useMutant<T, U>(subject: T, selector?: (subject: T) => U) {
  const rerender = useRerender();

  useEffect(() => onMutate(subject, rerender, selector), []);

  return selector ? selector(subject) : subject;
}
