import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  padding: 0 0 0 max(15%, calc(100vw - 1500px));

  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.colors.background};

  display: grid;
  grid:
    'experiences experiences' 70px
    'logo qualifications'
    'contact contact' 70px
    / auto 1fr;

  align-items: center;
  align-content: center;
  justify-content: center;

  overflow: hidden;

  transition: background-color 0.8s;

  @media ${p => p.theme.queries.regularAndLower} {
    padding: 0 0 0 36px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 47px;
  }

  > .logo-wrapper {
    margin: 72px 65px 72px 0;

    @media ${p => p.theme.queries.regularAndLower} {
      margin: 30px 0 13px;
    }
  }
`;
