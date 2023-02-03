import { motion } from 'framer-motion';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { AnimationVariants } from '~/types';

import { Container } from './styles';

export type ArrowButtonProps = {
  type: 'back' | 'forward';
  onClick: () => void;
};

export const ArrowButton = ({ type, onClick }: ArrowButtonProps) => {
  const Icon =
    type === 'back' ? MdOutlineArrowBackIos : MdOutlineArrowForwardIos;

  const variants: AnimationVariants = {
    enterInitial: {
      width: 0,
    },
    backInitial: {
      width: '100%',
    },
    whileInView: {
      width: '100%',
      transition: {
        duration: 1,
        delay: 1,
      },
    },
    backExit: {
      width: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container arrowType={type}>
      <motion.button className="bar" variants={variants} onClick={onClick}>
        <Icon className="icon" />
      </motion.button>
    </Container>
  );
};
