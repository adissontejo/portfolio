import { useState } from 'react';
import { Target, Transition } from 'framer-motion';

export interface UseLoopAnimationProps {
  from: Target;
  to: Target;
  transition?: Transition & {
    initialDelay?: number;
  };
}

export const useLoopAnimation = ({
  from,
  to,
  transition,
}: UseLoopAnimationProps) => {
  const [iterationCount, setIterationCount] = useState(0);

  return {
    initial: iterationCount % 2 === 0 ? from : to,
    animate: iterationCount % 2 === 0 ? to : from,
    transition: {
      ...transition,
      delay:
        (iterationCount % 2 === 0 ? transition?.initialDelay : 0) +
        transition?.delay,
    },
    onAnimationComplete: () => setIterationCount(prev => prev + 1),
  };
};
