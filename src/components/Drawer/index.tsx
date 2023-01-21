import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { Theme } from '~/styles';
import { Drawers } from '~/types';

import { Container } from './styles';

export type DrawerProps = {
  id: Drawers;
  label: string;
  color: keyof Theme['colors'];
  rightToLeftPosition: number;
  href: string;
};

export const Drawer = ({
  id,
  label,
  color,
  rightToLeftPosition,
}: DrawerProps) => {
  const { activeDrawer, columnWidth, isInitialPage, openDrawer } =
    useDrawersContext();

  const translateX = `calc(-100vw + ${
    (rightToLeftPosition + 1) * columnWidth
  }px)`;

  const initial = {
    translateX: activeDrawer === id ? translateX : '100vw',
  };

  const animate = {
    translateX: 0,
    transition: {
      ease: 'easeInOut',
      duration: activeDrawer === id ? 1.5 : 1,
    },
  };

  const exit = {
    translateX: activeDrawer === id ? translateX : '100vw',
    transition: {
      ease: 'easeInOut',
      duration: activeDrawer === id ? 1.5 : 1,
    },
  };

  return (
    <Container
      gridArea={id}
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      onClick={() => openDrawer(id)}
      animateEntrances={isInitialPage}
    >
      <motion.div
        className="bar"
        initial={initial}
        animate={animate}
        exit={exit}
      >
        <p className="label">{label}</p>
        <img className="icon" src={`/drawer-icons/${id}.svg`} alt={label} />
      </motion.div>
      <motion.div
        className="column"
        initial={initial}
        animate={animate}
        exit={exit}
      />
    </Container>
  );
};
