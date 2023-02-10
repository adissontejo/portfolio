import styled from 'styled-components';

export const Container = styled.section`
  margin: 54px 0 0;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  > .wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    > .title {
      margin: 0 0 29px;

      color: ${p => p.theme.colors.light};
      font-size: 1rem;
    }
  }

  &:has(+ &)::after {
    content: '';

    margin: 54px 0 0;

    width: 75%;
    max-width: 440px;
    height: 1px;
    background: ${p => p.theme.colors.light};
    opacity: 0.25;
  }
`;
