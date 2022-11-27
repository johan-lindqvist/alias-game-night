import { Slider as MuiSlider, Typography } from "@mui/material"
import { SliderProps } from "./types"
import { Container, LeftCell, MidCell, RightCell } from './styled';

export const Slider = ({ label, value, onChange, ...props }: SliderProps) => {
  const handleChange = (event: Event, value: number | number[]) => {
    onChange(value as number);
  };

  return (
    <Container>
      <LeftCell>
        <Typography>{label}</Typography>
      </LeftCell>
      <MidCell>
        <MuiSlider value={value} {...props} onChange={handleChange} />
      </MidCell>
      <RightCell>
        {value}
      </RightCell>
    </Container>
  )
}