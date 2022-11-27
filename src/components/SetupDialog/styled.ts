import styled from "styled-components";

export const Container = styled.div`
  ${({ theme }) => `
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: ${theme.palette.grey[200]};
  `}
`;

export const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
`;

export const ColumnMiddle = styled.div`
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ColumnRight = styled(ColumnLeft)``;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(5, 5, 0, 5)};
`;
