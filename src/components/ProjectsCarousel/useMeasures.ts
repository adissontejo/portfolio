import { useMemo } from 'react';

import { useStylesContext } from '~/contexts';
import { useMediaQuery } from '~/hooks';

export const useMeasures = () => {
  const { theme } = useStylesContext();

  const isSmall = useMediaQuery(theme.queries.small);

  const radius = useMemo(() => {
    if (isSmall) {
      return 664;
    }

    return 1265;
  }, [isSmall]);

  return { radius };
};
