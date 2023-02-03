import { useStylesContext } from '~/contexts';
import { useMediaQuery } from '~/hooks';

export const useMeasures = () => {
  const { theme } = useStylesContext();

  const isSmall = useMediaQuery(theme.queries.small);

  const carouselWidth = isSmall ? 244 : 436;

  return { carouselWidth };
};
