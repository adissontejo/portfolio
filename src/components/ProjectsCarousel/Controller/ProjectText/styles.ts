import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  min-width: min(1000px, 100vw);

  display: flex;
  flex-direction: column;
  align-items: center;

  > .name-wrapper {
    max-width: 450px;
    height: 50px;

    display: flex;
    align-items: center;

    @media ${p => p.theme.queries.small} {
      max-width: min(238px, 100vw - 120px);
      height: 35px;
    }

    > .name {
      padding: 0 5px;

      max-width: 100%;

      color: ${p => p.theme.colors.light};
      font-size: 1.2rem;
    }
  }

  > .about-wrapper {
    max-width: min(940px, 95vw);

    > .about {
      margin: 50px 0 0;

      max-width: 100%;

      color: ${p => p.theme.colors.light};
      font-size: 1rem;
      text-align: center;
    }
  }
`;
