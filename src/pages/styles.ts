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

const logoEnterAnimationMobile = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
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

const logoLoopAnimationMobile = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-60px);
  }
`;

export type ContainerProps = {
  animateEntrance: boolean;
};

export const Container = styled.div<ContainerProps>`
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

    animation: ${logoEnterAnimation} 3s ease-in-out
        ${p => (p.animateEntrance ? '1' : '0')},
      ${logoLoopAnimation} 4s ease-in-out
        ${p => (p.animateEntrance ? '3' : '0')}s infinite alternate;

    @media ${p => p.theme.queries.regularAndLower} {
      margin: 30px 0 13px;

      animation: ${logoEnterAnimationMobile} 3s ease-in-out
          ${p => (p.animateEntrance ? '1' : '0')},
        ${logoLoopAnimationMobile} 4s ease-in-out
          ${p => (p.animateEntrance ? '3' : '0')}s infinite alternate;
    }
  }
`;
