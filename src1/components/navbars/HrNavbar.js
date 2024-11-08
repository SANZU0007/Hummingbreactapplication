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
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Importing Admin Panel Icon
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

export default function Navbar({activeComponent ,loadComponent}) {
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
            {user.username || 'Guest'}
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
        <div >
        <div className='sidebar-content'>
            <div className='sidebar-topcontent'>
                <div className='sidebar-title'>HummingBEE</div>
                <div className='sidebar-links' style={{cursor:"default"}}>Menu</div>
                <div className={`sidebar-links ${activeComponent=="HRDashboard"?'active-compo':''}`} onClick={() => loadComponent('HRDashboard')}>Dashboard</div>
                <div className={`sidebar-links ${activeComponent=="HRLeavesAndAttendance"?'active-compo':''}`} onClick={() => loadComponent('HRLeavesAndAttendance')}>Leave & Attendance</div>
           

                <div className={`sidebar-links ${activeComponent=="CreateSurvey"?'active-compo':''}`} onClick={() => loadComponent('CreateSurvey')}> Create Survey</div>
                
           
                <div className={`sidebar-links ${activeComponent=="AllSurveys"?'active-compo':''}`} onClick={() => loadComponent('AllSurveys')}>Survey Response</div>

               
           
            </div>
            <div onClick={handleLogout} className='sidebar-logout'>Logout</div>
        </div>
      
      </div>




     

{/* {user.role === 'admin' && 
<>
<ListItem button onClick={handleAdminPanelClick}>
            <ListItemIcon>
              <AdminPanelSettingsIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
          </ListItem>
</>} */}
         


          
        </List>
      </Drawer>
      <Main open={open} />
    </Box>
  );
}