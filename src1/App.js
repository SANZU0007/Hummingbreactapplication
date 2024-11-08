import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Survey from './components/Survey';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Graphs from './components/Graphs';
import Header from './components/Header';
import Temp from './components/Temp';
import SignUp from './components/SignUp';
import Login from './components/Login'
import { Authprovider } from './utils/auth';
import ThankYou from './components/ThankYou';
import { RequireAuth } from './utils/RequireAuth';
import Flash from './components/Flash';
import ScrollToTop from './components/ScrollToTop';
import HRDashboard from './components/HRDashboard';
import Toolkit from './components/Toolkit';
import HRPanel from './components/HRPanel'
import Requestleave from './components/Requestleave';
import LeaveView from './components/LeaveView';
import { createContext, useEffect, useState } from 'react';
import { fetchAllUserDetails, fetchNormalUser } from './ApiService/api';
import axios from 'axios';
import LandingPage from './components/Home/LandingPage';

export const UserContext = createContext()



function App() {


  const [userDetails, setUserDetails] = useState([]);

  console.log(userDetails)

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/employees');
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
          <Route path='/Home' element={<LandingPage/>} />
          <Route path='/takeSurvey' element={<RequireAuth><Survey /></RequireAuth>} />
          <Route path='/takeSurvey/graphs' element={<RequireAuth><Toolkit /></RequireAuth>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/onboarding' element={<RequireAuth><ThankYou /></RequireAuth>} />
          <Route path='/hrdashboard' element={<RequireAuth><HRPanel /></RequireAuth>} />
          <Route path='/toolkit' element={<Toolkit />} />
          <Route path='/requestleave' element={<Requestleave />} />
          <Route path='/leaveview' element={<LeaveView />}/>
        </Routes>
        </Authprovider>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
