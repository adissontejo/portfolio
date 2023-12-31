import { MotionValue, useTransform } from 'framer-motion';

export interface useTranslateXProps {
  index: number;
  length: number;
}

export const useTranslateX = (
  offset: MotionValue<number>,
  { index, length }: useTranslateXProps
) => {
  const translate = useTransform(offset, value => {
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

  return x;
};
