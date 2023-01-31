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

  const buttonVariants: AnimationVariants = {
    enterInitial: {
      width: 0,
    },
    animate: {
      width: '100%',
      transition: {
        duration: 0.7,
        delay: 0.8,
      },
    },
    loadAnimate: {
      width: '100%',
      transition: {
        duration: 0.7,
      },
    },
    backExit: {
      width: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <Container color={color}>
      <motion.button
        className="button"
        variants={buttonVariants}
        onClick={() => closeDrawer(id)}
      >
        <div className="label-wrapper">
          <p className="label">voltar</p>
          <MdOutlineArrowBackIosNew className="icon" />
        </div>
      </motion.button>
    </Container>
  );
};
