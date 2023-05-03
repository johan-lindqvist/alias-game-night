import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export const KeybindTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip open {...props} classes={{ popper: className }} />
))(() => ({ [`& .${tooltipClasses.tooltip}`]: { transform: 'translateY(-10px) !important' } }));
