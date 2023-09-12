import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/Context/userContext';

function HomePage() {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(currentUser){
      setIsLoggedIn(true);
    }
  }, [currentUser])
  return (
    <div>
        <h1>Home Page</h1>
        {!isLoggedIn ?
          (
          <>
            <Link to="/signup">Sign Up</Link><br/><br/>
            <Link to="/login">Login</Link><br/><br/>
          </>
          )
          :
          (
          <>
            <Link to="/dashboard">Go To dashboard</Link><br/><br/>
          </>
          )
        }
          
    </div>
  )
}

export default HomePage;