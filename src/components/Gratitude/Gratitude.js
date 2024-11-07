import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Receive from './Receive';
import Sent from './Sent';
import Compose from './Compose';
import Box from '@mui/material/Box';
import "./gratitude.css"

export default function Gratitudes() {
  const [value, setValue] = React.useState(0); // Set default selected tab to 0 (first tab)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to render the component based on the selected tab index
  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <Receive />;
      case 1:
        return <Sent />;
      case 2:
        return <Compose />;
      default:
        return null;
    }
  };

  return (
    <div style={{textAlign:"start"}} className='gratitude-container'>

      <h3>Gratitude Note</h3>
      <Tabs value={value} onChange={handleChange} aria-label="gratitude tabs example">
        <Tab  style={{color:"#009A9A" ,textTransform:"none" ,marginLeft:"20px"}} label="Received" />
        <Tab style={{color:"#009A9A" ,textTransform:"none",marginLeft:"20px"}} label="Sent" />
        <Tab style={{color:"#009A9A",textTransform:"none",marginLeft:"20px"}} label="Compose" />
      </Tabs>
      
      {/* Render the component based on the active tab */}
      <Box mt={2}>
        {renderTabContent()}
      </Box>
    </div>
  );
}
