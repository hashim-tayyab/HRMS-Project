import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

function EmployeeDashboard() {
    const [employee, setEmployee] = useState([]);
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState();
    const [checkOutTime, setCheckOutTime] = useState();


    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = decodeToken(token);
        const userId = decoded.id;
        const getEmployeeDetail = async () => {
            await axios.get(`http://localhost:4000/employee/${userId}/`)
            .then((response) => {
              setEmployee(response.data);
            });
        }
        getEmployeeDetail();
    }, [])

    const setTime = () => {
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+ '-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = time+' '+date;
      setCheckInTime(dateTime);
      setCheckedIn(true);
    } 

    const setOutTime = () => {
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+ '-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = time+' '+date;
      setCheckOutTime(dateTime);
      setCheckedIn(false);
    } 

  return (
    <div>
        <h1>{employee.username} Dashboard</h1>
{!checkedIn ? (
        <button onClick={setTime}>Check In</button>
        )
      :(
        <button onClick={setOutTime}>Check Out</button>
      )
      }
        <br/><br/>
        <div>Check In Time:  {checkInTime}</div>
        <div>Check Out Time:  {checkOutTime}</div>

    </div>
  )
}

export default EmployeeDashboard;