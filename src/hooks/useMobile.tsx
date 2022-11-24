import { useEffect, useState } from "react";

export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 639px)").matches
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.matchMedia("(max-width: 639px)").matches);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}
