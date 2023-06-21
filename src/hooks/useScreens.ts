import { theme } from '~/styles';

import { useBreakpoint } from './useBreakpoint';

export const useScreens = () => {
  const isSm = useBreakpoint(theme.screens['sm']);
  const isMd = useBreakpoint(theme.screens['md']);
  const isLg = useBreakpoint(theme.screens['lg']);
  const isXl = useBreakpoint(theme.screens['xl']);
  const is2xl = useBreakpoint(theme.screens['2xl']);

  return {
    sm: !!isSm,
    md: !!isMd,
    lg: !!isLg,
    xl: !!isXl,
    '2xl': !!is2xl,
  };
};
