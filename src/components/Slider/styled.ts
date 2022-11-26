import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const LeftCell = styled.div`
  flex-shrink: 0;
  width: 160px;
`;

export const MidCell = styled.div`
  flex: 1;
`;

export const RightCell = styled.div`
  flex-shrink: 0;
  width: 40px;
  text-align: center;
`;