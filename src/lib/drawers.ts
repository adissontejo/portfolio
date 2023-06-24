import { DrawerId, ScreenId, drawers } from '~/data';

export const getColumnLeftPos = (drawerId: DrawerId) => {
  const { rightToLeftPosition } = drawers[drawerId];

  return `calc(100vw - var(--drawer-column-width)*(${rightToLeftPosition} + 1))`;
};

export const getScreenFromPathname = (pathname: string): ScreenId => {
  const drawers: DrawerId[] = ['experiences', 'qualifications', 'contact'];

  let screen: ScreenId = 'home';

  drawers.forEach(drawer => {
    const regex = new RegExp(`^/${drawer}.*$`);

    if (pathname.match(regex)) {
      screen = drawer;
    }
  });

  return screen;
};
