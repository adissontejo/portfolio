import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  background: #343434;

  display: flex;

  > .folders {
    flex: 1;
    height: fit-content;
    overflow: auto;

    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    justify-content: space-evenly;
  }
`;
