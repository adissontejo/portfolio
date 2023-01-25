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

  const x = type === 'back' ? '-100%' : '100%';

  const variants: AnimationVariants = {
    enterInitial: {
      x,
    },
    backInitial: {
      x: 0,
    },
    whileInView: {
      x: 0,
      transition: {
        duration: 1,
      },
    },
    backExit: {
      x,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container arrowType={type} onClick={onClick}>
      <motion.div className="bar" variants={variants} />
      <Icon className="icon" />
    </Container>
  );
};
