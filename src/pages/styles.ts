import styled, { keyframes } from 'styled-components';

const logoAnimation = keyframes`
  0% {
    transform: translateX(-8px);
  }

  100% {
    transform: translateX(8px);
  }
`;

export const Container = styled.div`
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

  > .logo {
    grid-row: 2;
    grid-column: 1;
    margin: 72px 65px 72px 0;

    animation: ${logoAnimation} 3s ease-in-out infinite;
    animation-direction: alternate;
  }
`;
