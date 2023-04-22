import React from 'react';

// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

import { FEED_IMAGE } from '../../utils/config';

export default function FeedCard({
  post: { title, description, created_at, updated_at },
}) {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia sx={{ height: 230 }} image={FEED_IMAGE} title="green iguana" />
      <CardContent sx={{ backgroundColor: '#d3d3d347' }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary">
          {new Date(created_at).toDateString()}
        </Typography>
      </CardActions>
    </Card>
  );
}

FeedCard.propTypes = {
  post: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};
