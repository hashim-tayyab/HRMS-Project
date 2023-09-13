import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import './EmployeeDashboard.css';

function EmployeeDashboard() {
    const [employee, setEmployee] = useState([]);
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState();
    const [checkOutTime, setCheckOutTime] = useState();
    const [todayDate, setTodayDate] = useState();
    const [userId, setUserId] = useState();


    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = decodeToken(token);
        const userId = decoded.id;
        setUserId(userId);
        const getEmployeeDetail = async () => {
            await axios.get(`http://localhost:4000/employee/${userId}/`)
            .then((response) => {
              setEmployee(response.data);
            });
        }
        getEmployeeDetail();
    }, [])

    const setTime = async () => {
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+ '-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      setCheckInTime(time);
      setTodayDate(date);
      setCheckedIn(true);
      try {
        const CheckingInTime = await axios.post(`http://localhost:4000/addcheckin/${userId}/`, {
          date: date,
          checkInTime: time,
        })
      } catch (error) {
        console.log(error);
      }
      
    } 

    const setOutTime = async () => {
      var today = new Date();
      // var date = today.getDate()+'-'+(today.getMonth()+1)+ '-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      // var dateTime = time+' '+date;
      // setCheckOutTime(dateTime);
      setCheckOutTime(time);
      setCheckedIn(false);
      try {
        const CheckingOutTime = await axios.post(`http://localhost:4000/addcheckout/${userId}/`, {
          checkOutTime: time,
        })
      } catch (error) {
        console.log(error);
      }
    } 

  return (
    <div>
        <h1>{employee.username} Dashboard</h1>
        
      <div className='checkin-box'>
        {!checkedIn ? (
          <button onClick={setTime}>Check In</button>
          )
          :
          (
          <button onClick={setOutTime}>Check Out</button>
          )
        }
        <br/><br/>
        <p>Date: {todayDate}</p>
        <br/>
        <div>Check In Time:  {checkInTime}</div>
        <div>Check Out Time:  {checkOutTime}</div>
      </div>


    </div>
  )
}

export default EmployeeDashboard;