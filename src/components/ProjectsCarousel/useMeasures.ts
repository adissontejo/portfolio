import { useStylesContext } from '~/contexts';
import { useDimensions, useMediaQuery } from '~/hooks';

export const useMeasures = () => {
  const { width } = useDimensions();

  const { theme } = useStylesContext();

  const isSmall = useMediaQuery(theme.queries.small);

  const imageWidth = isSmall ? 244 : 436;

  const textWidth = Math.min(width, 1000);

  return { imageWidth, textWidth };
};
