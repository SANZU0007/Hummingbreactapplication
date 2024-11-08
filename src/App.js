import './App.css';
import Home from './components/Home';
import Survey from './components/Survey';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp';
import Login from './components/Login'
import { Authprovider } from './utils/auth';
import ThankYou from './components/ThankYou';
import { RequireAuth } from './utils/RequireAuth';
import Flash from './components/Flash';
import ScrollToTop from './components/ScrollToTop';
import Toolkit from './components/Toolkit';
import HRPanel from './components/HRPanel'
import Requestleave from './components/Requestleave';
import LeaveView from './components/LeaveView';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import LandingPage from './components/Home/LandingPage';
import { apiUrl } from './api';

export const UserContext = createContext()

function App() {
  const [userDetails, setUserDetails] = useState([]);

  console.log(userDetails)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/employees`);
        setUserDetails(response.data);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="App">

      <UserContext.Provider value={{ userDetails }}>
        <Router>
          <ScrollToTop />
          <Authprovider>
            <Flash />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Home' element={<LandingPage />} />
              <Route path='/takeSurvey' element={<RequireAuth><Survey /></RequireAuth>} />
              <Route path='/takeSurvey/graphs' element={<RequireAuth><Toolkit /></RequireAuth>} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/onboarding' element={<RequireAuth><ThankYou /></RequireAuth>} />
              <Route path='/hrdashboard' element={<RequireAuth><HRPanel /></RequireAuth>} />
              <Route path='/toolkit' element={<Toolkit />} />
              <Route path='/requestleave' element={<Requestleave />} />
              <Route path='/leaveview' element={<LeaveView />} />
            </Routes>
          </Authprovider>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
