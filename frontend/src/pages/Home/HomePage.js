import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/Context/userContext';
import { StatusContext } from '../../components/Context/statusContext';

function HomePage() {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {adminStatus, setAdminStatus} = useState(StatusContext)


  useEffect(() => {
    if(currentUser){
      setIsLoggedIn(true);
    }
  }, [currentUser, adminStatus, setAdminStatus]);
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
          {adminStatus ?
            (
              <>
              <Link to="/dashboard">Go To dashboard</Link><br/><br/>
              </>
            )
            :
            (
              <>
              <Link to="/employeedashboard">Go To dashboard</Link><br/><br/>
              </>
            )
          }
          </>
          )
        }
          
    </div>
  )
}

export default HomePage;