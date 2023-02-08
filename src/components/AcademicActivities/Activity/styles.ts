import styled from 'styled-components';
import { motion } from 'framer-motion';

export type ContainerProps = {
  type: 'left' | 'right';
};

export const Container = styled(motion.div)<ContainerProps>`
  padding-${p => p.type}: max(0px, calc(50vw - 700px));
  align-self: flex-${p => (p.type === 'left' ? 'start' : 'end')};

  display: flex;
  flex-direction: ${p => (p.type === 'left' ? 'row' : 'row-reverse')};
  align-items: center;

  @media ${p => p.theme.queries.regularAndLower} {
    padding-${p => p.type}: max(10px, calc(50vw - 285px));

    flex-direction: column;
    align-items: flex-${p => (p.type === 'left' ? 'start' : 'end')};
    gap: 25px;
  }

  > .image-wrapper {
    position: relative;

    width: 448px;
    height: 252px;

    @media ${p => p.theme.queries.regularAndLower} {
      width: 384px;
      height: 216px;
    }

    @media ${p => p.theme.queries.small} {
      width: 256px;
      height: 144px;
    }

    > .image {
      object-fit: cover;
    }
  }

  > .text-wrapper {
    flex: 1;
    max-width: min(600px, calc(100% - 20px));

    display: flex;
    flex-direction: column;
    gap: 45px;
    overflow: hidden;

    text-align: ${p => (p.type === 'left' ? 'start' : 'end')};

    @media ${p => p.theme.queries.regularAndLower} {
      gap: 20px;
    }

    > .title, >.about {
      padding-${p => p.type}: 55px;

      width: 100%;

      @media ${p => p.theme.queries.regularAndLower} {
        padding: 0;
      }
    }

    > .title {
      color: ${p => p.theme.colors.light};
      font-size: 1rem;
    }

    > .about {
      color: ${p => p.theme.colors.light};
      font-size: 0.8rem;
    }
  }
`;
