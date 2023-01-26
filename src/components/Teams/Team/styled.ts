import styled from 'styled-components';

import { ITeamContainerProps } from './types';

export const TeamContainer = styled.div<ITeamContainerProps>`
  ${({ theme, $color, $active }) => `
    display: flex;
    flex-direction: column;

    padding: ${theme.spacing(4)};
    width: ${theme.custom.teamsCard.width}px;
    min-height: ${theme.custom.teamsCard.width * 1.25}px;
    border-radius: ${theme.custom.teamsCard.borderRadius}px;

    background-color: ${$color};

    transform: ${$active ? `translateY(${theme.custom.teamsCard.borderRadius}px)` : 'translateY(50%)'};

    transition: transform 250ms ease-in-out;
  `}
`;
