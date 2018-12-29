import { useState, useRef, useEffect, RefObject } from "react";

export function useHover<T>(): [RefObject<T>, boolean] {
  const [value, setValue] = useState(false);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref && ref.current) {
      const node = <HTMLElement>(<any>ref.current);
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (ref && ref.current) {
        const node = <HTMLElement>(<any>ref.current);
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  return [ref, value];
}
