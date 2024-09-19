import { useRef } from "react";

function useDebounce() {
  let timeoutId = useRef(null);

  const debounce = (cbFun, delay = 1000) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(cbFun, delay);
  };
  return debounce;
}

export default useDebounce;
