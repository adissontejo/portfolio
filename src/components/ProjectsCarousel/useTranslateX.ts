import { MotionValue, useTransform } from 'framer-motion';

import { useMeasures } from './useMeasures';

export type useTranslateXProps = {
  width: number;
  index: number;
  length: number;
};

export const useTranslateX = (
  carouselX: MotionValue<number>,
  { width, index, length }: useTranslateXProps
) => {
  const { imageWidth } = useMeasures();

  const interpolateX = useTransform(carouselX, [0, imageWidth], [0, width], {
    clamp: false,
  });

  const x = useTransform(interpolateX, value => {
    const min = (3 - length) * width;
    const max = -min;

    const initial = index * width;

    if (initial + value >= max) {
      const offset = Math.floor((initial + value - max) / (width * length)) + 1;

      return -length * width * offset;
    }

    if (initial + value <= min) {
      const offset = Math.floor((min - initial - value) / (width * length)) + 1;

      return length * width * offset;
    }

    return 0;
  });

  const opacity = useTransform(
    [x, interpolateX],
    ([xValue, carouselXValue]: number[]) => {
      if (Math.abs(xValue + carouselXValue + index * width) >= width) {
        return 0;
      }

      return 1;
    }
  );

  return { x, opacity };
};
