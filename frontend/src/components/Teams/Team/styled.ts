import styled from 'styled-components';

import { ITeamContainerProps } from './types';

export const TeamColor = styled.div`
  height: 8px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const TeamContainer = styled.div<ITeamContainerProps>`
  ${({ theme, $color, $active }) => `
    display: flex;
    flex-direction: column;

    padding: ${theme.spacing(4)};
    width: ${theme.custom.teamsCard.width}px;
    min-height: ${theme.custom.teamsCard.width * 1.25}px;
    border-radius: ${theme.custom.teamsCard.borderRadius}px;
    padding-top: 24px;

    background-color: rgba(0, 0, 0, 0.35);

    transform: ${$active ? `translateY(${theme.custom.teamsCard.borderRadius}px)` : 'translateY(40%)'};

    transition: transform 250ms ease-in-out;

    ${TeamColor} {
      background-color: ${$color};
    }
  `}
`;
