import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageEmployees() {
    const [employees, setEmployees] = useState([]);
    
    useEffect (() => {
        console.log("IN USEFFect");
        const getUsers = async () =>{
        const employeeList =  await axios.get('http://localhost:4000/getemployees').then((res) => {
            console.log(res.data)
            setEmployees(res.data);
        });
    }
    getUsers();
},[]);
  return (
    <div>
        <div className='employeeCard'>
        {employees.map(employee => {
            return (
                <div 
                key={employee._id}>
                    {employee.username}
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default ManageEmployees;