import React from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

const NewPost = () => {
  const handlePostAdd = () => {};
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handlePostAdd}
      ></SpeedDial>
    </>
  );
};

export default NewPost;
