import React from 'react'
import {Formik } from 'formik';
import { signupSchema } from './SignupSchema';
import axios from 'axios';
import { PersistFormikValues } from 'formik-persist-values';



const initialValues={
  username: "",
  email: "",
  password: "",
  confirm_password:"",
};


function FormValidation() {  
  return (
    <Formik
    initialValues= {initialValues}
    validationSchema= {signupSchema}
    
    
    onSubmit = { (values) =>{
      axios.post('http://localhost:4000/user', {
        email: values.email,
        username: values.username,
        password: values.password,
        phone: values.phone,
        gender: values.gender,
      })
    }}>

    
{({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
     <form onSubmit={handleSubmit}>
     <div className='name-block'>
          <label htmlFor="username">Name</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='username'
              id='username'
              placeholder='Name' 
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              {errors.name && touched.name ? (<p className='form-error'>{errors.name}</p>):null}
      </div>
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
      <div className='confirm-block'>
          <label htmlFor='confirm_password'>Confirm Password</label>
          <br />
          <input type='password'
              autoComplete='off'
              name='confirm_password'
              id='confirm_password'
              placeholder='Confirm Password'
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
               />
            {errors.confirm_password && touched.confirm_password ?
            (<p className='form-error'>{errors.confirm_password}</p>):null}
        </div>
        <div>
            <br />
          <button type='submit'>Register</button>
      </div>
      <PersistFormikValues name="signup-form" />
     </form>
    )}
    </Formik>
  );
};

export default FormValidation;