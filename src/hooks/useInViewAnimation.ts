import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { MotionProps } from 'framer-motion';

import { useScreenContext } from '~/contexts';

import { useMeasures } from './useMeasures';
import { AnimationStates } from '~/types';

export type useInViewAnimationProps = {
  minDelay?: number;
  minAmount?: number;
  once?: boolean;
};

export function useInViewAnimation<T extends HTMLElement>({
  minDelay = 0.5,
  minAmount = 0.5,
  once = true,
}: useInViewAnimationProps = {}) {
  const { animationStates } = useScreenContext();

  const { ref, element, viewport } = useMeasures<T>();

  const [enabled, setEnabled] = useState(false);

  const amount = useMemo(() => {
    if (!element.height || !viewport.height) {
      return 1;
    }

    return Math.min(viewport.height / element.height, minAmount);
  }, [viewport, element]);

  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
    }, minDelay * 1000);
  }, []);

  type InViewProps = MotionProps &
    AnimationStates & { ref: MutableRefObject<T> };

  if (!enabled) {
    return {
      ref,
      ...animationStates,
      whileInView: undefined,
    } as InViewProps;
  }

  return {
    ref,
    ...animationStates,
    whileInView: animationStates.whileInView,
    viewport: {
      amount,
      once,
    },
  } as InViewProps;
}
