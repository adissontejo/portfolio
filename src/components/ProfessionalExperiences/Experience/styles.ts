import styled from 'styled-components';

export type ContainerProps = {
  type: 'left' | 'right';
};

export const Container = styled.div<ContainerProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 12px;

  > .header {
    position: relative;

    align-self: flex-${p => (p.type === 'left' ? 'start' : 'end')};

    width: min(100%, max(50%, 480px));

    overflow: hidden;

    > .bar {
      width: 100%;
      background: ${p => p.theme.colors.light};

      > .label {
        padding: 12px 48px;

        width: 100%;

        color: ${p => p.theme.colors.green};
        font-size: 1rem;
        text-align: ${p => (p.type === 'left' ? 'end' : 'start')};

        @media (max-width: 480px) {
          padding: 10px 5px;

          text-align: center;
        }
      }
    }
  }

  > .about-wrapper {
    position: relative;

    background: ${p => p.theme.colors.green};

    overflow: hidden;

    > .about {
      padding: 30px 0 0;

      width: 95vw;
      max-width: 1140px;

      color: ${p => p.theme.colors.light};
      font-size: 1rem;
      text-align: center;
    }
  }
`;

export const OpacityFilter = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 60px;
  background: linear-gradient(
    to top,
    ${p => p.theme.colors.green}00,
    ${p => p.theme.colors.green}
  );
`;
