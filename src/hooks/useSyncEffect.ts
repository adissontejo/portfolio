import { DependencyList, EffectCallback, useRef } from 'react';

export const useSyncEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const prev = useRef<unknown[]>(null);

  if (
    !deps ||
    prev.current === null ||
    prev.current.some((item, index) => item !== deps[index])
  ) {
    prev.current = deps?.map(item => item) || [];

    effect();
  }
};
