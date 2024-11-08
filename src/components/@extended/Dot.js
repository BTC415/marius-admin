import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project import
import getColors from 'utils/getColors';

const Dot = ({ color, size, variant, sx }) => {
  const theme = useTheme();
  const colors = getColors(theme, color || 'primary');
  const { main } = colors;

  return (
    <Box
      component="span"
      sx={{
        width: size || 8,
        height: size || 8,
        borderRadius: '50%',
        bgcolor: variant === 'outlined' ? '' : main,
        ...(variant === 'outlined' && {
          border: `1px solid ${main}`
        }),
        ...sx
      }}
    />
  );
};

Dot.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  variant: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default Dot;
