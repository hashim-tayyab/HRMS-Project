import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
        <h1>Dashboard</h1>
          <Link to="/getemployees">Employee List</Link><br/><br/>
          <Link to="/addemployee">Add Employee</Link><br/><br/>

    </div>
  )
}

export default Dashboard;