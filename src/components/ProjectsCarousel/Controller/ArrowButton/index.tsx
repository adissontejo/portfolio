import { motion } from 'framer-motion';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { useDrawersContext } from '~/contexts';

import { Container } from './styles';

export type ArrowButtonProps = {
  type: 'back' | 'forward';
  onClick: () => void;
};

export const ArrowButton = ({ type, onClick }: ArrowButtonProps) => {
  const { animationType } = useDrawersContext();

  const Icon =
    type === 'back' ? MdOutlineArrowBackIos : MdOutlineArrowForwardIos;

  const x = type === 'back' ? '-100%' : '100%';

  return (
    <Container arrowType={type} onClick={onClick}>
      <motion.div
        className="bar"
        initial={animationType !== 'back' && { x }}
        animate={{ x: 0 }}
        exit={animationType === 'back' && { x, transition: { duration: 1 } }}
        transition={{
          duration: 1,
          delay: animationType === 'forward' ? 1.5 : 0.5,
        }}
      />
      <Icon className="icon" />
    </Container>
  );
};
