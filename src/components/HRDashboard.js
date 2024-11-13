import React from 'react'
import { useAuth } from '../utils/auth';

import '../styles/hrdashboard.css'

import 'react-datepicker/dist/react-datepicker.css';

import { HrfeedBack } from './hrfeedback/HrfeedBack';
import ViewHrfeedback from './hrfeedback/ViewHrfeedback';


function HRDashboard({ employees, setEmployees }) {

  
    return (
        <>

        

              
               
           
                    <div style={{display:'flex'}}>
                        <HrfeedBack />
                        <ViewHrfeedback />
                    </div>
                

               


          
        </>
    )
}



export default HRDashboard