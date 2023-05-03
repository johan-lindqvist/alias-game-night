import styled from 'styled-components';

export const Word = styled.span`
  font-size: 36px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const NoWord = styled.span`
  font-size: 24px;
  letter-spacing: 3px;
  color: ${({ theme }) => theme.palette.grey[500]};
`;
