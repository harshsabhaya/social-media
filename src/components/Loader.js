import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { PropTypes } from 'prop-types';

export default function Loader({ sx }) {
  return (
    <Box sx={{ display: 'flex', ...sx }}>
      <CircularProgress />
    </Box>
  );
}

Loader.propTypes = {
  sx: PropTypes.object,
};
