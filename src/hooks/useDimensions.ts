import { useEffect, useState } from 'react';

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener('resize', () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  if (dimensions === null && dimensions.width === 0) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  return dimensions;
};
