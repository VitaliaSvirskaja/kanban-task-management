import { useEffect, MutableRefObject } from "react";

// TODO: add escape to clickaway listener
// TODO: add focus to clickaway listener

export function useClickAwayListener(
  innerElementRef: MutableRefObject<HTMLElement | null>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    function handleClickAway(event: MouseEvent) {
      if (!innerElementRef.current?.contains(event.target as Node)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [onOutsideClick, innerElementRef]);
}
