import { Slider as MuiSlider, Typography } from '@mui/material';

import { Container, LeftCell, MidCell, RightCell } from './styled';
import { SliderProps } from './types';

export function Slider({ label, value, onChange, ...props }: SliderProps) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  return (
    <Container>
      <LeftCell>
        <Typography>{label}</Typography>
      </LeftCell>
      <MidCell>
        <MuiSlider value={value} {...props} onChange={handleChange} />
      </MidCell>
      <RightCell>{value}</RightCell>
    </Container>
  );
}
