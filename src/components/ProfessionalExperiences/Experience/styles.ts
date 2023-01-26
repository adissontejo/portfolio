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

    width: 480px;
    min-width: 50%;
    max-width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-${p => (p.type === 'left' ? 'end' : 'start')};
    justify-content: center;

    overflow: hidden;

    > .bar {
      position: absolute;
      top: 0;
      ${p => p.type}: 0;
      z-index: -1;

      width: 100%;
      height: 100%;
      background: ${p => p.theme.colors.light};
    }

    > .label {
      margin: 12px 48px;

      color: ${p => p.theme.colors.green};
      font-size: 1rem;

      @media (max-width: 480px) {
        margin: 10px 5px;
        align-self: center;
      }
    }
  }

  > .about-wrapper {
    position: relative;

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
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 30px;
  background: linear-gradient(
    to top,
    ${p => p.theme.colors.green}00,
    ${p => p.theme.colors.green}
  );
`;
