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
  const { activeDrawer, columnWidth, animationType, openDrawer } =
    useDrawersContext();

  const x = `calc(-100vw + ${(rightToLeftPosition + 1) * columnWidth}px)`;

  const initial = {
    x: activeDrawer === id ? x : '100vw',
  };

  const animate = {
    x: 0,
    transition: {
      duration: activeDrawer === id ? 1.5 : 1,
    },
  };

  const exit = {
    x: activeDrawer === id ? x : '100vw',
    transition: {
      duration: activeDrawer === id ? 1.5 : 1,
    },
  };

  return (
    <Container
      gridArea={id}
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      onClick={() => openDrawer(id)}
      initial={animationType === 'load' ? { width: 0 } : false}
      animate={{ width: '100%' }}
      transition={{ duration: 2, delay: 1 + rightToLeftPosition * 0.2 }}
    >
      <motion.div
        className="bar"
        initial={animationType === 'back' && initial}
        animate={animate}
        exit={exit}
      >
        <div className="label-wrapper">
          <p className="label">{label}</p>
          <img className="icon" src={`/drawer-icons/${id}.svg`} alt={label} />
        </div>
      </motion.div>
      <motion.div
        className="column"
        initial={animationType === 'back' ? initial : { height: 0 }}
        animate={animationType === 'back' ? animate : { height: '100vh' }}
        exit={exit}
        transition={{ duration: 1, delay: rightToLeftPosition * 0.2 }}
      />
    </Container>
  );
};
