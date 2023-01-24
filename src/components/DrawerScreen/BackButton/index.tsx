import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId } from '~/data';

import { Container, ContainerProps } from './styles';

export type BackButtonProps = ContainerProps & {
  id: DrawerId;
};

export const BackButton = ({ id, color }: BackButtonProps) => {
  const { animationType, closeDrawer } = useDrawersContext();

  return (
    <Container color={color} onClick={() => closeDrawer(id)}>
      <motion.div
        className="bar"
        initial={animationType !== 'back' && { x: '-100%' }}
        animate={{ x: 0 }}
        exit={
          animationType === 'back' && {
            x: '-100%',
            transition: { duration: 0.7 },
          }
        }
        transition={{
          duration: 0.7,
          delay: animationType === 'forward' ? 0.8 : 0.5,
        }}
      />
      <div className="label-wrapper">
        <p className="label">voltar</p>
        <MdOutlineArrowBackIosNew className="icon" />
      </div>
    </Container>
  );
};
