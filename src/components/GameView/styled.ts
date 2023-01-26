import styled, { css } from 'styled-components';

const GridStyle = css`
  display: grid;

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;

  gap: 0px;
`;

export const GameContainer = styled.div`
  ${({ theme }) => `
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: ${theme.palette.background.default};

    ${GridStyle}
  `}
`;

export const GameCellLeft = styled.div`
  grid-row-start: 1;
  grid-column-start: 1;

  grid-row-end: 2;
  grid-column-end: 2;
`;

export const GameCellRight = styled.div`
  grid-row-start: 1;
  grid-column-start: 2;

  grid-row-end: 2;
  grid-column-end: 3;
`;

export const GameCellBottom = styled.div`
  grid-row-start: 2;
  grid-column-start: 1;

  grid-row-end: 3;
  grid-column-end: 3;
`;
