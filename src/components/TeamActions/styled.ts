import styled from 'styled-components';

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const StyledButton = styled.button`
  padding: 10px;
  color: #999;

  outline: none;
  border: none;
  background-color: transparent;

  transition: all 200ms ease;

  &:hover:enabled {
    cursor: pointer;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
  }
`;
