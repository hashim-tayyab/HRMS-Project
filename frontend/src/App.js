import React, { useEffect, useState } from 'react';
import {Routes, Route} from "react-router";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from './components/Login/LoginForm';
import HomePage from './pages/Home/HomePage';
import PaymentPage from './pages/Payment/PaymentPage';
import MyNavbar from './components/Navbar/Navbar';
import GetEmployees from './pages/ManageEmployees/GetEmployees';
import Dashboard from './pages/Dashboard/Dashboard';

import { UserContext } from './components/Context/userContext';
import { StatusContext } from './components/Context/statusContext';

import AddEmployees from './pages/ManageEmployees/AddEmployee';
import Protected from './components/Protected/Protected';
import EmployeeLogin from './components/Login/EmployeeLogin'
import EmployeeDashboard from './pages/EmployeeDashboard/EmployeeDashboard';
import LeaveApply from './pages/EmployeeDashboard/LeaveApply/LeaveApply';

// import Logout from './components/Logout/Logout';
import {decodeToken } from 'react-jwt';
import axios from 'axios';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() =>{
      const token = localStorage.getItem('token');
      if(token !== null){
        const myDecodedToken = decodeToken(token);
      setDecodedToken(myDecodedToken.id);
      setAdminStatus(myDecodedToken.isAdmin);
      setIsLoggedIn(true);
      const getDetails = async () => {
        if(isLoggedIn === true){
          if(adminStatus === true){
            try{
              const response = await axios.get(`http://localhost:4000/getuser/${decodedToken}`);
              setCurrentUser(response.data);
            } catch(err){
              console.log("Cannot get details", err);
            }
          }
          else if(adminStatus === false){
            try{
              const response = await axios.get(`http://localhost:4000/employee/${decodedToken}`);
              setCurrentUser(response.data);
            } catch(err){
              console.log("Cannot get details", err);
            }
          }
        }
      }
      getDetails()
    }
      else{
        return;
      };
      }, [isLoggedIn, adminStatus]);

    return (
      <div className="App">
          <UserContext.Provider value={{currentUser, setCurrentUser}}>
            <StatusContext.Provider value={{adminStatus, setAdminStatus}}>
              <MyNavbar/>          
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/signup' element={<SignupForm/>} />
                <Route path='login' element={<LoginForm/>}/>
                
                
                <Route path='/payment' element={<Protected isLoggedIn={false}><PaymentPage/></Protected>}/>  
                <Route path='/payment' element={<Protected isLoggedIn={false}><PaymentPage/></Protected>}/>  
                <Route path='/addemployee' element={<Protected isLoggedIn={false}><AddEmployees/></Protected>}/>  
                <Route path='/getemployees' element={<Protected isLoggedIn={false}><GetEmployees/></Protected>}/>  
                <Route path='/dashboard' element={<Protected isLoggedIn={false}><Dashboard/></Protected>}/>


                <Route path='/loginemployee' element={<EmployeeLogin/>}/>
                <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
                <Route path='/applyleave' element={<LeaveApply/>}/>

             </Routes>     
          </StatusContext.Provider>
          </UserContext.Provider>   
      </div>
    );
}

export default App;
