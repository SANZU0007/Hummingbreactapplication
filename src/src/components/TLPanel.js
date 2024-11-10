import React, { useEffect, useState } from 'react';
import '../styles/hrpanel.css'; // CSS file for styling
import HRDashboard from './HRDashboard';
import HRLeavesAndAttendance from './HRLeavesAndAttendance';
import TLNavbar from './navbars/TLNavbar';
import TLDashboard from './TLDashboard';
import axios from 'axios';
import { apiUrl } from '../api';
import TLLeavesAndAttendance from './TLLeavesAndAttendance';
import AddEmployee from './AddEmployee';


const TLPanel = () => {
  const [activeComponent, setActiveComponent] = useState('TLDashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataLoaded,setDataLoaded]=useState(false)

  const loadComponent = (component) => {
    setActiveComponent(component);
    setSidebarOpen(false); // Close sidebar when a new component is loaded
  };
  
  const [employees, setEmployees] = useState([])

  const fetchEmployees = async () => {
    let userData = JSON.parse(localStorage.getItem('user'))
    try {
      const response = await axios.get(`${apiUrl}/api/employees`);
      setEmployees(response.data.filter((emp)=>{
        return emp.team == userData.team
      }))
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(()=>{
    fetchEmployees()
  },[])
 

  return (
    <>
        <TLNavbar loadComponent={loadComponent} activeComponent={activeComponent}/>
 
        {activeComponent === 'TLDashboard' && <TLDashboard employees={employees} setEmployees={setEmployees} />}

        {activeComponent === 'TLLeavesAndAttendance' && <TLLeavesAndAttendance  employees={employees} setEmployees={setEmployees} />} 
        
        {activeComponent === 'AddEmployee' && <AddEmployee  />} 
       
  
    </>
  );
};


export default TLPanel;
