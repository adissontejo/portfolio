import { useScreenContext } from '~/contexts';
import { drawers } from '~/data';

export const useDrawer = () => {
  const { screenId, ...rest } = useScreenContext();

  if (screenId === 'home') {
    throw new Error('Must be used in a drawer screen');
  }

  return {
    id: screenId,
    ...drawers[screenId],
    ...rest,
  };
};
