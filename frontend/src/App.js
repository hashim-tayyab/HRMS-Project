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
import AddEmployees from './pages/ManageEmployees/AddEmployee';
// import {PaymentContext} from './components/Context/paymentContext'
import Protected from './components/Protected/Protected';
import EmployeeLogin from './components/Login/EmployeeLogin'
import EmployeeDashboard from './pages/EmployeeDashboard/EmployeeDashboard';
import {decodeToken } from 'react-jwt';
import axios from 'axios';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() =>{
      const token = localStorage.getItem('token');
      if(token !== null){
        const myDecodedToken = decodeToken(token);
      setDecodedToken(myDecodedToken.id);
      setIsLoggedIn(true);
      }
      const getDetails = async () => {
        if(isLoggedIn === true){
          try{
            const response = await axios.get(`http://localhost:4000/getuser/${decodedToken}`);

            setCurrentUser(response.data);
          } catch(err){
            console.log("Cannot get details", err);
          }
        }
      }
      getDetails()
      ;}, [isLoggedIn]);

    return (
      <div className="App">
          <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <MyNavbar/>          
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/signup' element={<SignupForm/>} />
            <Route path='login' element={<LoginForm/>}/>
            
              
              <Route path='/payment' element={
              <Protected isLoggedIn={false}>
                <PaymentPage/>
                </Protected>
              }/>  

              <Route path='/addemployee' element={<AddEmployees/>}/>  
            <Route path='/getemployees' element={<GetEmployees/>}/>  
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/loginemployee' element={<EmployeeLogin/>}/>
            <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
          </Routes>     
          </UserContext.Provider>   
      </div>
    );
}

export default App;
