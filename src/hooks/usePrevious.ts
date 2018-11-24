import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T): T | void {
  // Create a ref object to store the value
  const ref = useRef<T | void>(undefined);

  // Update the ref object each time the value is updated
  useEffect(
    () => {
      ref.current = value;
    },
    [value] // Run only when the value updates
  );

  // Returns the previous value immediately (will be undefined on the first run)
  return ref.current;
}
