import PropTypes from 'prop-types';

// material-ui
import { Grid, Rating, Stack, Typography } from '@mui/material';

// project imports
import Avatar from 'components/@extended/Avatar';

// assets
import { StarFilled, StarOutlined } from '@ant-design/icons';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| PRODUCT DETAILS - REVIEW ||============================== //

const ProductReview = ({ avatar, date, name, rating, review }) => (
  <Grid item xs={12}>
    <Stack direction="row" spacing={1}>
      <Avatar alt={name} src={avatar && avatarImage(`./${avatar}`)} />
      <Stack spacing={2}>
        <Stack>
          <Typography variant="subtitle1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {date}
          </Typography>
          <Rating
            size="small"
            name="simple-controlled"
            value={rating < 4 ? rating + 1 : rating}
            icon={<StarFilled style={{ fontSize: 'inherit' }} />}
            emptyIcon={<StarOutlined style={{ fontSize: 'inherit' }} />}
            precision={0.1}
            readOnly
          />
        </Stack>
        <Typography variant="body2">{review}</Typography>
      </Stack>
    </Stack>
  </Grid>
);

ProductReview.propTypes = {
  avatar: PropTypes.string,
  date: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  review: PropTypes.string
};

export default ProductReview;
