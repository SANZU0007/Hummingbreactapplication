import React, { useEffect, useState } from 'react';
import '../styles/hrpanel.css'; // CSS file for styling
import HRDashboard from './HRDashboard';
import HRLeavesAndAttendance from './HRLeavesAndAttendance';
import Navbar from './navbars/HrNavbar';
import SurveyForm from '../componentssurvey/CreateSurvey';
import SurveyResponse from '../componentssurvey/SurveyResponse';
import axios from 'axios';
import { apiUrl } from '../api';
import Graphs from './Graphs';
import Survey from '../componentssurvey/Survey';
import CheckInMap from './CheckIn&moodmap/Checkinmap';


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
        <div className="main-toolkit-content" style={{marginLeft: isSidebarOpen?'250px':''}}>
         

        {activeComponent === 'CreateSurvey' && <SurveyForm employees={employees} setEmployees={setEmployees} />}


        {activeComponent === 'HRDashboard' && <Graphs loadComponent={loadComponent} employees={employees} setEmployees={setEmployees} />}
 
        {/* {activeComponent === 'HRDashboard' && <HRDashboard employees={employees} setEmployees={setEmployees} />} */}

        {activeComponent === 'CheckIn' && <CheckInMap />}

        {activeComponent === 'AllSurveys' && <Survey/>} 

        {activeComponent === 'HRLeavesAndAttendance' && <HRLeavesAndAttendance  employees={employees} setEmployees={setEmployees} />} 
       
        {activeComponent === 'AllSurveysResponse' && <SurveyResponse  employees={employees} setEmployees={setEmployees} />} 
        </div>
  
    </>
  );
};


export default Sidebar;
