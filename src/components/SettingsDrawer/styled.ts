import styled from 'styled-components';

export const DrawerButton = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: 0;
    left: 0;
    padding: ${theme.spacing(1)};
  `}
`;
