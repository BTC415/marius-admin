import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, tooltipClasses, Tooltip as MuiTooltip } from '@mui/material';

// project import
import getColors from 'utils/getColors';

// ==============================|| TOOLTIP - VARIANT ||============================== //

function getVariantStyle({ color, theme, labelColor }) {
  const colors = getColors(theme, color);
  const { main, contrastText } = colors;
  let colorValue = color ? color : '';

  if (['primary', 'secondary', 'info', 'success', 'warning', 'error'].includes(colorValue)) {
    return {
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: main,
        color: labelColor ? labelColor : contrastText
      },
      [`& .${tooltipClasses.arrow}`]: {
        color: main
      }
    };
  } else {
    return {
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: colorValue,
        color: labelColor ? labelColor : contrastText,
        boxShadow: theme.shadows[1]
      },
      [`& .${tooltipClasses.arrow}`]: {
        color: colorValue
      }
    };
  }
}

// ==============================|| STYLED - TOOLTIP COLOR ||============================== //

const TooltipStyle = styled(({ className, ...props }) => <MuiTooltip {...props} classes={{ popper: className }} />, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'labelColor'
})(({ theme, color, labelColor }) => ({
  ...(color && getVariantStyle({ color, theme, labelColor }))
}));

// ==============================|| EXTENDED - TOOLTIP ||============================== //

export default function CustomTooltip({ children, arrow, labelColor = '', ...rest }) {
  const theme = useTheme();
  return (
    <Box display="flex">
      <TooltipStyle arrow={arrow} {...rest} theme={theme} labelColor={labelColor}>
        {children}
      </TooltipStyle>
    </Box>
  );
}

CustomTooltip.propTypes = {
  children: PropTypes.element,
  arrow: PropTypes.bool,
  labelColor: PropTypes.string,
  rest: PropTypes.array
};
