import styled from 'styled-components';

export const GameContainer = styled.div`
  ${({ theme }) => `
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: ${theme.palette.background.default};
  `}
`;
