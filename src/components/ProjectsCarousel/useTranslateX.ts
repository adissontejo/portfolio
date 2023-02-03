import { MotionValue, useTransform } from 'framer-motion';

import { useMeasures } from './useMeasures';

export type useTranslateXProps = {
  index: number;
  length: number;
};

export const useTranslateX = (
  carouselX: MotionValue<number>,
  { index, length }: useTranslateXProps
) => {
  const { carouselWidth } = useMeasures();

  const position = useTransform(carouselX, value => value / carouselWidth);

  const translate = useTransform(position, value => {
    const min = 3 - length;
    const max = -min;

    if (index + value >= max) {
      const overflow = Math.floor((index + value - max) / length) + 1;

      return -length * overflow;
    }

    if (index + value <= min) {
      const overflow = Math.floor((min - index - value) / length) + 1;

      return length * overflow;
    }

    return 0;
  });

  const x = useTransform(translate, [0, 1], ['0%', '100%'], { clamp: false });

  const offset = useTransform(
    [translate, position],
    ([translateValue, positionValue]: number[]) =>
      translateValue + positionValue + index
  );

  return { x, offset };
};
