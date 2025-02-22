"use client";
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Checkbox, Stack} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
  const [email,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const router = useRouter();

  const signup = async () => {
    console.log(email,password);
    const response = await axios.post("https://course-helper-fb5w.vercel.app/auth/signup",{email:email,password:password});
    console.log(response.data);
    router.push("/login");
  } 
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box
        sx={{
          flex: { xs: 0, md: 3.3 },
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(/images/login.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          flex: 1.6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            boxShadow: 0,
            borderRadius: 2,
            padding: 5,
            marginTop: { xs: 0, md: 15 },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <img width={40} src="/images/locked.png" alt="Locked icon" />
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
              SignUp
            </Typography>
          </Stack>          
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            label="Email"
            margin="normal"
            required
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
          />
          <Button
            onClick={signup}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            type="submit"
          >
            SignUp
          </Button>
          <a href='/login' style={{color:'blue', textDecoration:'underline'}}>Already have an account? Login </a>
        </Box>
      </Box>
    </Box>
  );
}
export default page