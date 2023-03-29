import styled from 'styled-components';

export const GameContainer = styled.div`
  ${({ theme }) => `
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: ${theme.palette.background.default};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const Cell = styled.div`
  flex: 1;
`;
