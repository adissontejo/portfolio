import { useMediaQuery } from './useMediaQuery';

export const useBreakpoint = (breakpoint: string) => {
  return useMediaQuery(`screen and (min-width: ${breakpoint})`);
};
