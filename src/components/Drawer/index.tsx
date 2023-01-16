import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { Theme } from '~/styles';

import { Container } from './styles';

export type DrawerProps = {
  label: string;
  color: keyof Theme['colors'];
  gridArea: string;
  rightToLeftPosition: number;
  href: string;
  selected?: boolean;
  onSelect?: () => void;
};

export const Drawer = ({
  label,
  color,
  gridArea,
  rightToLeftPosition,
  href,
  selected,
  onSelect,
}: DrawerProps) => {
  const router = useRouter();

  const navigate = () => {
    if (onSelect) {
      onSelect();
    }

    router.replace(href);
  };

  return (
    <Container
      gridArea={gridArea}
      color={color}
      position={rightToLeftPosition}
      onClick={navigate}
    >
      <motion.div
        className="bar"
        exit={
          selected
            ? { translateX: '-100vw' }
            : { x: '100vw', transition: { duration: 0.5 } }
        }
        transition={{
          ease: 'easeInOut',
          delay: 0,
          duration: 1.5,
        }}
      >
        <p className="label">{label}</p>
      </motion.div>
      <motion.div
        className="column"
        exit={
          selected
            ? { translateX: '-100vw' }
            : { translateX: '100vw', transition: { duration: 0.5 } }
        }
        transition={{
          ease: 'easeInOut',
          duration: 1.5,
        }}
      ></motion.div>
    </Container>
  );
};
