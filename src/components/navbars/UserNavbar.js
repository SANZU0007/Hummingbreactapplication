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
       
     
        <div className="toolkit-sidebar-content">
          {/* <img src="../images/humming-bee-logo.svg" className="toolkit-sidebar-title" /> */}
          <div className={`toolkit-sidebar-link `}  style={{ cursor: "default", paddingBottom:"10px" }}>Menu</div>
          
          {/* Buttons to switch between components */}
          <div className={`toolkit-sidebar-link ${activeComponent === 'Dashboard' ? 'active' : ''}`} onClick={() => loadComponent('Graphs')}>Dashboard</div>
          <div className={`toolkit-sidebar-link ${activeComponent === 'CheckIn' ? 'active' : ''}`} onClick={() => loadComponent('CheckIn')}> CheckIn</div>
        
          <div className={`toolkit-sidebar-link ${activeComponent === 'Positivity' ? 'active' : ''}`} onClick={() => loadComponent('Positivity')}>Positivity</div>
          <div className={`toolkit-sidebar-link ${activeComponent === 'Engagement' ? 'active' : ''}`} onClick={() => loadComponent('Engagement')}>Engagement</div>
          <div className={`toolkit-sidebar-link ${activeComponent === 'Relationship' ? 'active' : ''}`} onClick={() => loadComponent('Relationship')}>Relationship</div>
          <div className={`toolkit-sidebar-link ${activeComponent === 'Meaning' ? 'active' : ''}`} onClick={() => loadComponent('Meaning')}>Meaning</div>
      
          <div className={`toolkit-sidebar-link ${activeComponent === 'AllSurveys' ? 'active' : ''}`} onClick={() => loadComponent('AllSurveys')}>Fill Survey</div>
      
         
      
          
      
        </div>
        <div className="sidebar-logout">Logout</div>
  


     

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