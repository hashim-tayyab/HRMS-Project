import React from 'react';
import {Routes, Route} from "react-router";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from './components/Login/LoginForm';
import HomePage from './pages/Home/HomePage';

function App() {
    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={<SignupForm/>} />
          <Route path='login' element={<LoginForm/>}/>
        </Routes>
      </div>
    );
}

export default App;
