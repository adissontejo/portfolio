import { useEffect } from 'react';
import { animate, useMotionValue, useTransform } from 'framer-motion';

export type useTranslateXProps = {
  width: number;
  position: number;
  index: number;
  length: number;
};

export const useTranslateX = ({
  width,
  position,
  index,
  length,
}: useTranslateXProps) => {
  const animatedPosition = useMotionValue(0);

  useEffect(() => {
    animate(animatedPosition, position, {
      duration: 0.5,
    });
  }, [position]);

  const x = useTransform(animatedPosition, value => {
    const max = length - 3;
    const min = 3 - length;

    if (index - value >= max) {
      const floor = Math.floor((index - value - max) / length) + 1;

      return -floor * width * length;
    }

    if (index - value <= min) {
      const floor = Math.floor((min - index + value) / length) + 1;

      return floor * width * length;
    }

    return 0;
  });

  const opacity = useTransform(
    [x, animatedPosition],
    ([xValue, positionValue]: number[]) => {
      const translate = xValue - positionValue * width + index * width;

      if (translate <= -width || translate >= width) {
        return 0;
      }

      return 1;
    }
  );

  return { x, opacity };
};
