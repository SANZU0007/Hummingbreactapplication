import React, { useEffect, useState } from 'react';
import '../styles/hrpanel.css'; // CSS file for styling
import HRDashboard from './HRDashboard';
import HRLeavesAndAttendance from './HRLeavesAndAttendance';
import Navbar from './navbars/HrNavbar';
import SurveyForm from '../componentssurvey/CreateSurvey';
import SurveyResponse from '../componentssurvey/SurveyResponse';
import axios from 'axios';
import { apiUrl } from '../api';


const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState('HRDashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const loadComponent = (component) => {
    setActiveComponent(component);
    setSidebarOpen(false); // Close sidebar when a new component is loaded
  };
 
  const [employees, setEmployees] = useState([])

  useEffect(()=>{
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/employees`);
        setEmployees(response.data);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching employees:', err);
        // setError('Failed to load employee data');
        // setLoading(false);
      }
    };
    fetchEmployees();
  },[])

  return (
    <>
        <Navbar loadComponent={loadComponent} activeComponent={activeComponent}/>

        {activeComponent === 'CreateSurvey' && <SurveyForm employees={employees} setEmployees={setEmployees} />}
 
        {activeComponent === 'HRDashboard' && <HRDashboard employees={employees} setEmployees={setEmployees} />}

        {activeComponent === 'HRLeavesAndAttendance' && <HRLeavesAndAttendance  employees={employees} setEmployees={setEmployees} />} 
       
        {activeComponent === 'AllSurveys' && <SurveyResponse  employees={employees} setEmployees={setEmployees} />} 
  
    </>
  );
};


export default Sidebar;
