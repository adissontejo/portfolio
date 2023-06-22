import { DrawerId, drawers } from '~/data';

export const getColumnLeftPos = (drawerId: DrawerId) => {
  const { rightToLeftPosition } = drawers[drawerId];

  return `calc(100vw - var(--drawer-column-width)*(${rightToLeftPosition} + 1))`;
};
