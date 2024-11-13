import React, { useEffect, useState } from 'react';
// import '../styles/hrpanel.css'; // CSS file for styling
import HRDashboard from '../HRDashboard';
import HRLeavesAndAttendance from '../HRLeavesAndAttendance';
import TLNavbar from '../navbars/TLNavbar';
import TLDashboard from './TlDashAttendance';
import axios from 'axios';
import { apiUrl } from '../../api';

import AddEmployee from '../AddEmployee';
import TLLeavesAndAttendance from './TLLeavesAndAttendance';
import Graphs from '../Graphs';
import EditProfile from '../user-settings/EditProfile';
import CheckInMap from '../CheckIn&moodmap/Checkinmap';
import Survey from '../../componentssurvey/Survey';
import TLDashAttendance from './TlDashAttendance';



const TLPanel = () => {


  const [activeComponent, setActiveComponent] = useState('TLProfile');

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
      const response = await axios.get(`${apiUrl}/api/users/team/${userData.team}`);
      setEmployees(response.data.users) /* .filter((emp)=>{
        return emp.team == userData.team
      })) */
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

        <div className="main-toolkit-content" style={{marginLeft: isSidebarOpen?'250px':''}}>

        {activeComponent === 'TLProfile' && <Graphs loadComponent={loadComponent} employees={employees} setEmployees={setEmployees} />}
 
        {activeComponent === 'TLDashboard' && <TLDashAttendance loadComponent={loadComponent} employees={employees} setEmployees={setEmployees} />}

        {activeComponent === 'TLLeavesAndAttendance' && <TLLeavesAndAttendance  loadComponent={loadComponent} employees={employees} setEmployees={setEmployees} />} 
        
        {activeComponent === 'AddEmployee' && <AddEmployee loadComponent={loadComponent} />} 
       
        {activeComponent === 'EditProfile' && <EditProfile loadComponent={loadComponent} />} 

        {activeComponent === 'AllSurveys' && <Survey/>} 
       
        {activeComponent === 'CheckIn' && <CheckInMap />}
        </div>
  
    </>
  );
};


export default TLPanel;
