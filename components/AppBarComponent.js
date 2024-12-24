import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const AddBarComponent = () => {

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Course Helper 
        </Typography>
        <Button color="inherit" href='/login'>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AddBarComponent;