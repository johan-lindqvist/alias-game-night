import styled from "styled-components";

export const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AddTeamButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 117px;
  width: ${({ theme }) => theme.custom.teamsCard.width}px;
  margin: ${({ theme }) => theme.spacing(1)};
  border: 2px dashed ${({ theme }) => theme.palette.grey[400]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  color: ${({ theme }) => theme.palette.grey[700]};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.grey[900]};
  }
`;