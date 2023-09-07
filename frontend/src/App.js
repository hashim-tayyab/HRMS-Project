import React from 'react';
import {Routes, Route} from "react-router";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from './components/Login/LoginForm';
import HomePage from './pages/Home/HomePage';
import PaymentPage from './pages/Payment/PaymentPage';
import { AuthProvider } from './components/Context/Usercontext';
import Navbar from './components/Navbar/Navbar';


function App() {
    return (
      <div className="App">
        <AuthProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/signup' element={<SignupForm/>} />
            <Route path='login' element={<LoginForm/>}/>
            <Route path='/payment' element={<PaymentPage/>}/>       
          </Routes>
        </AuthProvider>
      </div>
    );
}

export default App;
