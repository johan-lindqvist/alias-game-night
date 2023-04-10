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

export const Actions = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 30px 40px;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Divider = styled.div`
  height: 40px;
  width: 1px;
  background-color: #999;
`;
