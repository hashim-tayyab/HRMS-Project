// import React, { useState } from 'react'

// function AddEmployee() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [companyName, setCompanyName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [position, setPosition] = useState('');
//     const [addedBy, setAddedBy] = useState('');

//   return (
//     <div>
        
//     </div>
//   )
// }

// export default AddEmployee



import React, { useContext, useEffect, useState } from 'react'
import {Formik } from 'formik';
// import { signupSchema } from './SignupSchema';
import axios from 'axios';
// import { PersistFormikValues } from 'formik-persist-values';
import { UserContext } from '../../components/Context/userContext';



const initialValues={
  username: "",
  email: "",
  password: "",
  phone: "",
  companyName: "",
  position: "",
  addedBy: "",
};


function AddEmployee() {  
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [added, setAdded] = useState();

    useEffect(() => {
        setAdded(currentUser.username)    
    }, [currentUser, setCurrentUser]);

    // console.log(currentUser);
    return (
    <Formik
    initialValues= {initialValues}
    // validationSchema= {signupSchema}
    
    
    onSubmit = { (values) =>{
      axios.post('http://localhost:4000/addemployee', {
        username: values.username,
        companyName: values.companyName,
        email: values.email,
        username: values.username,
        password: values.password,
        position: values.position,
        phone: values.phone,
        addedBy: added,
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
          <label htmlFor='companyName'>Company Name</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='companyName'
              id='companyName'
              placeholder='Company Name'
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
               />
            {errors.confirm_password && touched.confirm_password ?
            (<p className='form-error'>{errors.confirm_password}</p>):null}
        </div>

        <div className='confirm-block'>
          <label htmlFor='position'>Position</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='position'
              id='position'
              placeholder='Position'
              value={values.position}
              onChange={handleChange}
              onBlur={handleBlur}
               />
            {errors.confirm_password && touched.confirm_password ?
            (<p className='form-error'>{errors.confirm_password}</p>):null}
        </div>

        <div className='phone-block'>
          <label htmlFor='phone'>Phone Number</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='phone'
              id='phone'
              placeholder='03---------------'
              value={values.phone}
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
      {/* <PersistFormikValues name="signup-form" /> */}
     </form>
    )}
    </Formik>
  );
};

export default AddEmployee;