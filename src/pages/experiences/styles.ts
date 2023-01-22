import styled from 'styled-components';

import { DrawerScreen } from '~/components';

export const Container = styled(DrawerScreen)``;

export const Section = styled.section`
  margin: 54px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  > .subtitle {
    margin: 0 0 29px;

    color: ${p => p.theme.colors.light};
    font-size: 1rem;
  }
`;
