import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
        <h1>Home Page</h1>
        <Link to="/signup">Sign Up</Link><br/><br/>
          <Link to="/login">Login</Link><br/><br/>
          <Link to="/manageemployees">Employee List</Link><br/><br/>

    </div>
  )
}

export default HomePage;