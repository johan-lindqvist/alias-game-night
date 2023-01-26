import styled from 'styled-components';

export const TeamsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;
