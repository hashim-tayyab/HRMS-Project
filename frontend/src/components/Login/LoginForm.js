import React from 'react'
import {Formik } from 'formik';
import { loginSchema } from './LoginSchema';




const initialValues={
  email: "",
  password: "",
};

function LoginForm() {  
  return (
    <Formik
    initialValues= {initialValues}
    validationSchema= {loginSchema}
    onSubmit={ (values) =>{
      "Submitted"
      console.log(values);
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