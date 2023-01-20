import styled from 'styled-components';

export const Container = styled.div`
  > svg {
    aspect-ratio: 1;

    @media ${p => p.theme.queries.small} {
      width: min(270px, calc(100vw - 140px));
    }
  }

  * {
    ${p => p.theme.mode === 'dark' && `fill: ${p.theme.colors.light};`}

    transition: fill 0.8s;
  }
`;
