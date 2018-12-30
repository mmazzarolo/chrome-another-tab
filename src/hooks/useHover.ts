import { useState, useRef, useEffect, RefObject } from "react";
import { delay } from "../utils/delay";

interface Options {
  delay?: number; // ms after which the hover status is set to false
}

const defaultOptions = {
  delay: 20
};

export function useHover<T>(
  options: Options = defaultOptions
): [RefObject<T>, boolean] {
  const [isHovered, setIsHovered] = useState(false);
  const isCurrentlyHovered = useRef(false);

  const handleMouseOver = () => {
    isCurrentlyHovered.current = true;
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handleMouseOut = async () => {
    isCurrentlyHovered.current = false;
    await delay(options.delay || 0);
    if (!isCurrentlyHovered.current) {
      console.log("ciao");
      setIsHovered(false);
    }
  };

  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref && ref.current) {
      const node = ref.current as any;
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (ref && ref.current) {
        const node = ref.current as any;
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  return [ref, isHovered];
}
