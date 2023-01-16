import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const logoEnterAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const logoLoopAnimation = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-30px);
  }
`;

export type ContainerProps = {
  animateEntrance: boolean;
};

export const Container = styled(motion.div)<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 0 0 15%;

  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.colors.light};

  display: grid;
  grid:
    'experiences experiences' 70px
    'logo qualifications'
    'contact contact' 70px
    / auto 1fr;

  align-items: center;
  align-content: center;
  justify-content: center;

  .logo {
    grid-row: 2;
    grid-column: 1;
    margin: 72px 65px 72px 0;

    animation: ${logoEnterAnimation} 3s ease-in-out
        ${p => (p.animateEntrance ? '1' : '0')},
      ${logoLoopAnimation} 4s ease-in-out
        ${p => (p.animateEntrance ? '3' : '0')}s infinite alternate;
  }
`;
