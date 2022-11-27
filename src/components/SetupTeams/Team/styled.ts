import styled from "styled-components";
import { Typography } from "@mui/material";

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

export const StyledCardTitle = styled(Typography)`
  flex: 1 1 auto;
  margin-left: 8px;
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 8px;
`;