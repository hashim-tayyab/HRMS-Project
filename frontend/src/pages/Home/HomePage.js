import React from 'react';
import { useAuth } from '../../components/Context/Usercontext';
import { Link } from 'react-router-dom';

function HomePage() {
  const auth = useAuth();
  return (
    <div>
        <h1>Home Page</h1>
        <Link to="/signup">Sign Up</Link><br/><br/>
        {!auth.user && (
          <Link to="/login">Login</Link>
        )}
        {/* <Link to="/login">Login</Link> */}
    </div>
  )
}

export default HomePage;