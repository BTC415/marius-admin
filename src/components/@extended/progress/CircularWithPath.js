import PropTypes from 'prop-types';

// material-ui
import { Box, CircularProgress, Typography, circularProgressClasses } from '@mui/material';

// ==============================|| PROGRESS - CIRCULAR PATH ||============================== //

export default function CircularWithPath({ value, size, variant, thickness, showLabel, pathColor, sx, ...others }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        sx={{ color: pathColor ? pathColor : 'grey.200' }}
        size={size}
        thickness={thickness}
        {...others}
        value={100}
      />
      {showLabel && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {value ? `${Math.round(value)}%` : '0%'}
          </Typography>
        </Box>
      )}
      <CircularProgress
        variant={variant}
        sx={{
          ...sx,
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={size}
        thickness={thickness}
        value={value}
        {...others}
      />
    </Box>
  );
}

CircularWithPath.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
  variant: PropTypes.string,
  thickness: PropTypes.number,
  showLabel: PropTypes.bool,
  pathColor: PropTypes.string,
  sx: PropTypes.array,
  others: PropTypes.array
};
