import React, { useState } from 'react';
import '../styles/hrpanel.css'; // CSS file for styling
import HRDashboard from './HRDashboard';
import HRLeavesAndAttendance from './HRLeavesAndAttendance';
import Hrtaskpost from './HrtodoList/Hrtaskpost';
import Navbar from './navbars/HrNavbar';
import SurveyForm from '../componentssurvey/CreateSurvey';
import Survey from '../componentssurvey/Survey';
import SurveyResponse from '../componentssurvey/SurveyResponse';


const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState('HRDashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);



  const loadComponent = (component) => {
    setActiveComponent(component);
    setSidebarOpen(false); // Close sidebar when a new component is loaded
  };
 


  const [employees, setEmployees] = useState([])



  return (
    <>


        <Navbar loadComponent={loadComponent} activeComponent={activeComponent}/>

        {activeComponent === 'CreateSurvey' && <SurveyForm employees={employees} setEmployees={setEmployees} />}
 
        {activeComponent === 'HRDashboard' && <HRDashboard employees={employees} setEmployees={setEmployees} />}

        {activeComponent === 'HRLeavesAndAttendance' && <HRLeavesAndAttendance  employees={employees} setEmployees={setEmployees} />} 
       


        {activeComponent === 'AllSurveys' && <SurveyResponse  employees={employees} setEmployees={setEmployees} />} 

{/* 
       
       */}
  
    </>
  );
};


export default Sidebar;
