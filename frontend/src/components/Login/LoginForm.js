import React, { useContext, useEffect } from 'react'
import {Formik } from 'formik';
import { loginSchema } from './LoginSchema';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/userContext';
// import { PaymentContext } from '../Context/paymentContext';

const initialValues={
  email: "",
  password: "",
};

function LoginForm() {  
const {currentUser, setCurrentUser} = useContext(UserContext)

useEffect(() => {
  // console.log(currentUser);

}, [currentUser]);


  const navigate = useNavigate();
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
          console.log(res.data);
           await setCurrentUser(res.data);
          localStorage.setItem('token', res.data.token);
            navigate("/dashboard");
        }
        else 
        {
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
        <div>
            <br />
          <button type='submit'>Login</button>
      </div>
     </form>
    )}
    </Formik>
  );
};

export default LoginForm;