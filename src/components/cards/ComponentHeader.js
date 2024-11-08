import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Link, Stack, Typography } from '@mui/material';

// assets
import { GlobalOutlined, NodeExpandOutlined } from '@ant-design/icons';

// ==============================|| COMPONENTS - BREADCRUMBS  ||============================== //

const ComponentHeader = ({ title, caption, directory, link }) => (
  <Box sx={{ pl: 3 }}>
    <Stack spacing={1.25}>
      <Typography variant="h2">{title}</Typography>
      {caption && (
        <Typography variant="h6" color="textSecondary">
          {caption}
        </Typography>
      )}
    </Stack>
    <Grid container spacing={0.75} sx={{ mt: 1.75 }}>
      {directory && (
        <Grid item xs={12}>
          <Typography variant="caption" color="textSecondary">
            <NodeExpandOutlined style={{ marginRight: 10 }} />
            {directory}
          </Typography>
        </Grid>
      )}
      {link && (
        <Grid item xs={12}>
          <Link variant="caption" color="primary" href={link} target="_blank">
            <GlobalOutlined style={{ marginRight: 10 }} />
            {link}
          </Link>
        </Grid>
      )}
    </Grid>
  </Box>
);

ComponentHeader.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.string,
  directory: PropTypes.string,
  link: PropTypes.string
};

export default ComponentHeader;
