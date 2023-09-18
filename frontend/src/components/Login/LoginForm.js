import React, { useContext, useEffect } from 'react'
import {Formik } from 'formik';
import { loginSchema } from './LoginSchema';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/userContext';
import { StatusContext } from '../Context/statusContext';

import { decodeToken } from 'react-jwt';
import './LoginForm.css'
// import { PaymentContext } from '../Context/paymentContext';

const initialValues={
  email: "",
  password: "",
};

function LoginForm() {  
const {currentUser, setCurrentUser} = useContext(UserContext);
const {adminStatus, setAdminStatus} = useContext(StatusContext);

useEffect(() => {
  // console.log(currentUser);

}, [currentUser]);


  const navigate = useNavigate();
  const refresh = () => {
    window.location.reload(true);
  }
  return (
    <Formik
    initialValues= {initialValues}
    validationSchema= {loginSchema}
    onSubmit = { async (values) =>{


     const res = await axios.post('http://localhost:4000/login', {
        email: values.email,
        password: values.password,
      });
        if(res.status == 200){
          // console.log("res", res);
           await setCurrentUser(res.data);
          localStorage.setItem('token', res.data.token);
          // console.log("tokenDetails", decodeToken(res.data.token));
          const isAdmin = decodeToken(res.data.token).isAdmin;
          setAdminStatus(isAdmin);
          // console.log("isAdmin", isAdmin);
        //     if(isAdmin){
        //     navigate("/dashboard");
        //     // refresh();
        //   }
        //   else{
        //     navigate("/employeedashboard");
        //     // refresh();
        //   }  
        }
        else {
          navigate("/login");
      }
    }}>
    
{({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
     <form onSubmit={handleSubmit}>
      <div className='email-block'>
          <label htmlFor='email'>Email</label>
          <br />
          <input type='email'
              autoComplete='off'
              name='email'
              id='email'
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
               />
              {errors.email && touched.email ? (<p className='form-error'>{errors.email}</p>):null}
      </div>
      <div className='password-block'>
          <label htmlFor='password'>Password</label>
          <br />
          <input type='password'
              autoComplete='off'
              name='password'
              id='password'
              placeholder='Password' 
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              />
            {errors.password && touched.password ? (<p className='form-error'>{errors.password}</p>):null}
      </div>
        <div className='btnDiv'>
            <button type='submit'>Login</button>
      </div>
     </form>
    )}
    </Formik>
  );
};

export default LoginForm;