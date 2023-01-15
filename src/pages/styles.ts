import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.colors.light};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    color: ${p => p.theme.colors.purple};
    font-size: 20px;
  }
`;
