import styled from 'styled-components';

export const Container = styled.div`
  > svg {
    max-width: calc(100vw - 120px);

    @media ${p => p.theme.queries.small} {
      width: 270px;
    }
  }

  * {
    ${p => p.theme.mode === 'dark' && `fill: ${p.theme.colors.light};`}

    transition: fill 0.8s;
  }
`;
