import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

import { KeybindTooltipProps } from './types';

export const KeybindTooltip = styled(({ className, ...props }: TooltipProps & KeybindTooltipProps) => (
  <Tooltip open {...props} title={props.tooltip} classes={{ popper: className }} />
))(() => ({ [`& .${tooltipClasses.tooltip}`]: { transform: 'translateY(-10px) !important' } }));
