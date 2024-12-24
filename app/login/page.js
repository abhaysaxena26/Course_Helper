import React from 'react';
import { Box, TextField, Button, Typography, Checkbox} from '@mui/material';

const page = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw',}}>

      <Box sx={{flex: 3.3,backgroundImage: 'url(/images/login.jpg)',backgroundSize:'cover',backgroundPosition: 'center'}}/>

      <Box sx={{ flex: 1.9 ,display: 'flex', flexDirection: 'column', justifyContent:'center',alignItems:'center',padding: 0}}>
        <Box sx={{ height:'100%',width: '100%', maxWidth: 500, boxShadow: 0, borderRadius: 2, padding: 4,marginTop:15}}>
          <Typography variant="h5" sx={{ mb: 3,display:'flex', justifyContent:'center'}}> Login </Typography>
          <TextField fullWidth label="Username" margin="normal" required />
          <TextField fullWidth label="Password" type="password" margin="normal" required/>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Checkbox aria-label="Remember me checkbox" />
            <Typography>Remember me</Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }} type="submit">Login</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default page