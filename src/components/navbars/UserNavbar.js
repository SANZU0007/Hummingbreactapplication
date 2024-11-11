import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function UserNavbar({activeComponent ,loadComponent}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleDrawerToggle = () => setOpen((prevOpen) => !prevOpen);
  
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Navigate to the home page
    navigate('/');
  };


  const handleDashBoard =() => {
    navigate('/fetch-data'); // Change this path as needed
  }

  const handleAdminPanelClick = () => {
    // Navigate to the admin panel
    navigate('/admin'); // Change this path as needed
  };

  return (
    <Box id="maintemplate" sx={{ display: 'flex', backgroundColor: "#002525" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "#01322a" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit" onClick={handleDrawerToggle} edge="start" sx={{ ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" noWrap>
            {/* {user.name || 'Guest'} */}
            <Avatar onClick={() => loadComponent('EditProfile')}>
              {user.name[0].toUpperCase()}
            </Avatar>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: "#01322a",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton style={{ color: "white" }} onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
       
     
       

          
          {/* Buttons to switch between components */}
          <div  className="sidebar-logout" onClick={() => loadComponent('Graphs')}>Dashboard</div>
         
          {/* <div className={`toolkit-sidebar-link ${activeComponent === 'CheckIn' ? 'active' : ''}`} onClick={() => loadComponent('CheckIn')}> CheckIn</div> */}
              
          {/* <div className={`toolkit-sidebar-link ${activeComponent === 'AllSurveys' ? 'active' : ''}`} onClick={() => loadComponent('AllSurveys')}>Fill Survey</div> */}
      
        <br></br>
        <div className="sidebar-logout" onClick={()=> navigate('/')}>Logout</div>
  
        </List>
      </Drawer>
      <Main open={open} />
    </Box>
  );
}