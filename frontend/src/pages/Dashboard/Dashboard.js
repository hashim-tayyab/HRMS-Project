import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className='dBoard'>
        <div>
        <h2>Admin Dashboard</h2>
        </div>
        <div className='linkss'>
          <Link to="/getemployees">Employee List</Link><br/><br/>
          <Link to="/addemployee">Add Employee</Link><br/><br/>
          <Link to='/leaverequests'>View Leave Requests</Link>
          </div>
    </div>
  )
}

export default Dashboard;