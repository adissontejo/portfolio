import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
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
  preventAnimations?: boolean;
};

export const Drawer = ({
  id,
  label,
  color,
  rightToLeftPosition,
  href,
  preventAnimations,
}: DrawerProps) => {
  const router = useRouter();

  const { activeDrawer, setActiveDrawer } = useDrawersContext();

  const navigate = () => {
    setActiveDrawer(id);

    setCookie('transitioned', true);

    router.push(href);
  };

  const translateX = `calc(-100vw + ${rightToLeftPosition * 60}px)`;

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
      position={rightToLeftPosition}
      onClick={navigate}
      animateEntrances={!preventAnimations}
    >
      <motion.div
        className="bar"
        initial={initial}
        animate={animate}
        exit={exit}
      >
        <p className="label">{label}</p>
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
