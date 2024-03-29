import React from 'react';

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: Event) => void,
  exclude: React.RefObject<HTMLElement>
) {
  React.useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      if (exclude.current && exclude.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, exclude, handler]);
}
