import styled from 'styled-components';

export const Cell = styled.div`
  width: 40px;
  height: 40px;
  margin: 5px;
  border: 1px solid #555;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #444;
  font-size: 11px;

  &:empty {
    border-color: #333;
  }

  &:not(:empty) {
    cursor: pointer;

    &:hover {
      border-color: #fff;
    }
  }
`;
