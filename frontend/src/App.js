import React from 'react';
import {Routes, Route} from "react-router";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from './components/Login/LoginForm';
import HomePage from './pages/Home/HomePage';
import PaymentPage from './pages/Payment/PaymentPage';
import MyNavbar from './components/Navbar/Navbar';
import ManageEmployees from './pages/ManageEmployees/ManageEmployees';


function App() {
    return (
      <div className="App">
          <MyNavbar />
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/signup' element={<SignupForm/>} />
            <Route path='login' element={<LoginForm/>}/>
            <Route path='/payment' element={<PaymentPage/>}/>  
            <Route path='/manageemployees' element={<ManageEmployees/>}/>     
          </Routes>
      </div>
    );
}

export default App;
