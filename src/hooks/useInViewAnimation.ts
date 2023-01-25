import { useEffect, useState } from 'react';

import { useDrawersContext } from '~/contexts';
import { AnimationStates } from '~/types';

export const useInViewAnimation = (minDelay: number) => {
  const { animationStates, animationType } = useDrawersContext();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
    }, minDelay * 1000);
  }, []);

  if (!enabled) {
    return animationStates;
  }

  return {
    ...animationStates,
    whileInView: [
      'all',
      'whileInView',
      animationType !== 'back' ? 'enterInView' : '',
      `${animationType}WhileInView`,
    ],
  } as AnimationStates;
};
