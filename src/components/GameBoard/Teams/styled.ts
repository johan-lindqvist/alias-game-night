import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ItemDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100%;
`;

export const ItemText = styled.div`
  font-size: 12px;
  color: #999;
`;

export const ItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  height: 40px;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid;
`;

export const Item = styled.div<{ $active: boolean; $color: string }>`
  ${ItemStyle};

  border-color: ${({ $active, $color }) => ($active ? $color : '#555')};

  ${ItemDot} {
    background-color: ${({ $color }) => $color};
  }

  ${ItemText} {
    color: ${({ $active }) => $active && '#fff'};
  }
`;

export const Button = styled.div`
  ${ItemStyle};

  color: #fff;
  border-color: #555;
  cursor: pointer;

  &:hover {
    color: #333;
    border-color: #fff;
    background-color: #fff;
  }
`;
