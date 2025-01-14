import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import {useState,useEffect} from 'react';
import Avatar from './Avatar';


const AppBarComponent = () => {
  const router = useRouter();
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(()=>{
      const checkUserLoggedIn = ()=>{
        const token = localStorage.getItem("token");
        if(token){
          setIsLoggedIn(true);
        }
      };
      checkUserLoggedIn();
  },[]);

  const handleLogOut = ()=>{
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      alert("You have been logged out");
      router.push("/login");
  };

  return (  
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Course Helper </Typography>
        {isLoggedIn ? (
          <Avatar/>
          // <div>Log Out</div>
        ):(
          <Button color="inherit" onClick={() => router.push("/login")}/>
        )}
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogOut}>Log Out</Button>
          )}
      </Toolbar>
    </AppBar> 
  );
};

export default AppBarComponent;