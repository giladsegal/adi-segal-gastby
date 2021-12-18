import React from 'react';

export default function usePrevious<T, K>(value: T, initialValue: K) {
  const ref = React.useRef<T | K>(initialValue);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
