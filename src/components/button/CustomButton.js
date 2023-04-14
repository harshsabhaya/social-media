import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { PropTypes } from 'prop-types';

const CustomButton = ({ loading, onClick, btnText, variant }) => {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button
        variant={variant ?? 'contained'}
        disabled={loading}
        onClick={onClick}
      >
        {btnText}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  loading: PropTypes.bool,
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
};
