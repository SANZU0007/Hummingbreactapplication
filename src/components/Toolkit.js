import React, { useState } from 'react';
import '../styles/toolkit.css'; // Assuming your CSS is in sidebar.css
import Graphs from './Graphs'
import UserNavbar from './navbars/UserNavbar';
import Survey from '../componentssurvey/Survey';
import CheckInMap from './CheckIn&moodmap/Checkinmap';
import EditProfile from './user-settings/EditProfile';


const Dashboard = () => <div className="content">Dashboard Component</div>;

const Toolkit = () => {
  const [activeComponent, setActiveComponent] = useState('Graphs');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const loadComponent = (component) => {
    setActiveComponent(component);
    setSidebarOpen(false); // Optional: Auto close sidebar after selecting
  };

  return (

    <>

    <UserNavbar activeComponent={activeComponent} loadComponent={loadComponent} />

    <div >
     

      <div className="main-toolkit-content" style={{marginLeft: isSidebarOpen?'250px':''}}>
       

      {activeComponent === 'AllSurveys' && <Survey />} 
      {activeComponent === 'EditProfile' && <EditProfile loadComponent={loadComponent} />} 

      
        {activeComponent === 'Graphs' && <Graphs activeComponent={activeComponent} loadComponent={loadComponent} />}
        {activeComponent === 'CheckIn' && <CheckInMap />}
      </div>
    </div>
    </>
  );
};

export default Toolkit;







