import React from 'react';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//  types of snackbar: error, warning, info, success

const CustomizedSnackbar = (props) => {
  const { snackData, handleSnackBar } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleSnackBar();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={snackData.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackData.type ?? 'success'}
          sx={{ width: '100%' }}
        >
          {snackData.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbar;

CustomizedSnackbar.propTypes = {
  snackData: PropTypes.object,
  handleSnackBar: PropTypes.func,
};
