import { DependencyList, useRef } from 'react';

export const useSyncEffect = <T = void>(
  effect: () => T,
  deps?: DependencyList
) => {
  const prev = useRef<unknown[]>(null);
  const result = useRef(null as T);

  if (
    !deps ||
    prev.current === null ||
    prev.current.some((item, index) => item !== deps[index])
  ) {
    prev.current = deps?.map(item => item) || [];

    result.current = effect();
  }

  return result.current;
};
