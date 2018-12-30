import { useState, useEffect, useRef } from "react";

interface Parameters {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
}

const checkKeyValidity = (e: KeyboardEvent, params: Parameters) => {
  return (
    e.key === params.key &&
    e.ctrlKey === !!params.ctrlKey &&
    e.metaKey === !!params.metaKey &&
    e.shiftKey === !!params.shiftKey
  );
};

export function useKeyboardPress(params: Parameters) {
  const [isKeyDown, setIsKeyDown] = useState(false);
  const shouldDisableKeyDownUpdate = useRef(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    const isKeyValid = checkKeyValidity(e, params);
    if (isKeyValid) {
      if (params.onKeyDown) {
        params.onKeyDown(e);
      }
      if (!shouldDisableKeyDownUpdate.current) {
        shouldDisableKeyDownUpdate.current = true;
        setIsKeyDown(true);
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    shouldDisableKeyDownUpdate.current = false;
    if (params.onKeyUp) {
      params.onKeyUp(e);
    }
    setIsKeyDown(false);
  };

  useEffect(() => {
    window.document.addEventListener("keydown", handleKeyDown);
    window.document.addEventListener("keyup", handleKeyUp);
    return () => {
      window.document.removeEventListener("keydown", handleKeyDown);
      window.document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return isKeyDown;
}
