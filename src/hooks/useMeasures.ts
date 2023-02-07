import { useEffect, useRef, useState } from 'react';

type Measures = {
  width?: number;
  height?: number;
};

export function useMeasures<T extends HTMLElement>() {
  const ref = useRef<T>();

  const [element, setElement] = useState<Measures>({});
  const [viewport, setViewport] = useState<Measures>({});

  useEffect(() => {
    const listener = () => {
      const rect = ref.current.getBoundingClientRect();

      setElement({
        width: rect.width,
        height: rect.height,
      });

      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    listener();

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  return { ref, element, viewport };
}
