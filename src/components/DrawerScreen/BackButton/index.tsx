import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId } from '~/data';
import { AnimationVariants } from '~/types';

import { Container, ContainerProps } from './styles';

export type BackButtonProps = ContainerProps & {
  id: DrawerId;
};

export const BackButton = ({ id, color }: BackButtonProps) => {
  const { closeDrawer } = useDrawersContext();

  const barVariants: AnimationVariants = {
    enterInitial: {
      x: '-100%',
    },
    animate: {
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.8,
      },
    },
    loadAnimate: {
      x: 0,
      transition: {
        duration: 0.7,
      },
    },
    backExit: {
      x: '-100%',
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <Container color={color} onClick={() => closeDrawer(id)}>
      <motion.div className="bar" variants={barVariants} />
      <div className="label-wrapper">
        <p className="label">voltar</p>
        <MdOutlineArrowBackIosNew className="icon" />
      </div>
    </Container>
  );
};
