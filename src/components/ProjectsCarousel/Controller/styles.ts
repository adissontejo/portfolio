import styled from 'styled-components';

export const Container = styled.div`
  margin: 25px 0 0;

  width: 100vw;

  display: flex;
  align-items: center;

  > .arrow-wrapper {
    flex: 1;

    min-width: 60px;
  }
`;

export const NamesContainer = styled.div`
  position: relative;
  z-index: -1;

  width: 450px;

  @media ${p => p.theme.queries.small} {
    width: min(238px, calc(100vw - 120px));
  }

  > .names-wrapper {
    width: auto;

    display: flex;
    gap: 550px;

    @media ${p => p.theme.queries.small} {
      gap: max(762px, calc(1120px - 100vw));
    }
  }
`;

export const AboutContainer = styled.div`
  position: relative;

  width: 1000px;

  overflow: hidden;

  > .about-wrapper {
    padding: 50px 0 0;

    width: auto;

    display: flex;
  }
`;

export type OpacityFilterProps = {
  type: 'top' | 'left' | 'right';
};

export const OpacityFilter = styled.div<OpacityFilterProps>`
  position: absolute;
  top: 0;
  ${p => p.type !== 'right' && 'left: 0;'}
  ${p => p.type === 'right' && 'right: 0;'}
  z-index: 10;

  width: ${p => (p.type === 'top' ? '100%' : '30px')};
  height: ${p => (p.type === 'top' ? '30px' : '100%')};
  background: linear-gradient(
    to ${p => p.type},
    rgba(50, 116, 109, 0),
    rgba(50, 116, 109, 1)
  );
`;
