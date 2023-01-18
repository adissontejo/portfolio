import styled from 'styled-components';

export const Container = styled.div`
  > svg {
    @media ${p => p.theme.queries.mediumAndLower} {
      max-width: calc(100vw - 150px);
    }
  }

  * {
    ${p => p.theme.mode === 'dark' && `fill: ${p.theme.colors.light};`}

    transition: fill 0.8s;
  }
`;
