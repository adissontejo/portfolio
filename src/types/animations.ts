import { TargetAndTransition } from 'framer-motion';

export type AnimationType = 'back' | 'forward' | 'load' | 'enter';

export type AnimationState = 'initial' | 'animate' | 'exit' | 'whileInView';

export type AnimationKey = `${AnimationType}${Capitalize<AnimationState>}`;

export type AnimationVariants = Partial<
  Record<AnimationKey | AnimationState, TargetAndTransition>
> & {
  all?: TargetAndTransition;
};

export type AnimationStates = Partial<
  Record<AnimationState, (keyof AnimationVariants)[]>
>;
