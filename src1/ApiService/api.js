import axios from 'axios';
import { apiUrl } from '../api';

export const EditAllGoals = async (goalId, updatedGoal) => {
  const response = await axios.put(`${apiUrl}/tasks/updateTask/${goalId}`, updatedGoal); // Adjust the endpoint as necessary
  return response.data; // Return the updated goal data or any relevant info
};

export const deleteAllGoals = async (goalId) => {
  const response = await axios.delete(`${apiUrl}/tasks/deleteTask/${goalId}`,); // Adjust the endpoint as necessary
  return response.data; // Return the updated goal data or any relevant info
};






const API_URL = `${apiUrl}/api/goals`; // Replace with your actual API endpoint

// Function to fetch all goals
export const fetchAllTask = async () => {
  try {
    const response = await axios.get(`${apiUrl}/tasks/all`);
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

const API_URL_User = `${apiUrl}/api/users/`




export const fetchNormalUser = async () => {
  try {
    const response = await axios.get(`${API_URL_User}normal` );
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};


export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(API_URL_User);
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Function to edit/update a goal
export const PostAllGoals = async (newGoals) => {
    try {
      // Use template literals to correctly build the URL
      const response = await axios.post(`${API_URL}/`, newGoals);
      return response.data; // Return the updated data
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };


// Function to delete a goal
export const deleteGoal = async (goalId) => {
    if (!goalId) {
      throw new Error('Goal ID is required.');
    }
  
    try {
      const response = await axios.delete(`${API_URL}/${goalId}`);
      return response.data; // Return the response data
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };
  



  // Function to edit/update a goal

const API_URL_CheckIn = `${apiUrl}/api/attendance`

export const checkInFunc = async (time) => {
  try {
    // Use template literals to correctly build the URL
    const response = await axios.post(`${API_URL_CheckIn}/checkin`, time);
    return response.data; // Return the updated data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};


export const TodayLoginUsers = async () => {
  try {
    const response = await axios.get(`${API_URL_CheckIn}/today-checkins`);
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};



const MapUrls = `${apiUrl}/api/attendance/`


export const EveryDayAttendance = async () => {
  try{
      const response  = await axios.get(`${MapUrls}/day`)
      return response.data; // Return the fetched data

  }catch(error){
    throw new Error(error.response ? error.response.data.message : error.message);
  }

}


export const WeeklyAttendance = async () => {
  try{
      const response  = await axios.get(`${MapUrls}/weekly`)
      return response.data; // Return the fetched data

  }catch(error){
    throw new Error(error.response ? error.response.data.message : error.message);
  }

}



export const MonthlyAttendance = async () => {
  try{
      const response  = await axios.get(`${MapUrls}/month`)
      return response.data; // Return the fetched data

  }catch(error){
    throw new Error(error.response ? error.response.data.message : error.message);
  }

}




// const API_URL = 'http://localhost:5000'; // Replace with your actual API endpoint


export const Registration = async (payload) => {
  try {
      const response = await axios.post(`${API_URL}/api/register`, payload); // Pass payload as the second argument
      return response.data; // Return the fetched data
  } catch (error) {
      // Throw an error with a custom message based on the response
      throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const LoginUser = async (payload) => {
  try {
      const response = await axios.post(`${API_URL}/api/login`, payload); // Pass payload for login
      return response.data; // Return the fetched data (like a token)
  } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message); // Handle errors
  }
};

const API_URLs = `${apiUrl}`; // Replace with your actual API endpoint


// Function to fetch all surveys
export const fetchAllSurveys = async () => {
  try {
    const response = await axios.get(`${API_URLs}/api/surveys`);
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};


export const fetchAllAnswer = async () => {
  try {
    const response = await axios.get(`${API_URLs}/api/answers`);
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

const API_URLAllUsers = `${apiUrl}`; // Replace with your actual API endpointapi/employees



export const fetchAllUserDetails = async () => {
  try {
    const response = await axios.get(`${API_URLAllUsers}/api/employees`);
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};