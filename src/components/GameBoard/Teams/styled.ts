import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  height: 40px;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid;

  color: #fff;
  border-color: #555;
  cursor: pointer;

  &:hover {
    color: #333;
    border-color: #fff;
    background-color: #fff;
  }
`;
