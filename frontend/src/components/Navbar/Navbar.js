import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
// import {decodeToken} from 'react-jwt';
// import {Logout} from '../Logout/Logout';
import { UserContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';


function MyNavbar() {
const {currentUser, setCurrentUser} = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(true);
  }

useEffect(() => {
  if(currentUser){
    setIsLoggedIn(true);
    // console.log(currentUser.username);

  }
}, [currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser, logout]);


  return (
    <Navbar className="bg-body-tertiary">
      <Container className='navContainer'>
        <Navbar.Brand href="#home">Welcome to HRMS</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {isLoggedIn? 
        (
        <Navbar.Text>
            Signed in as: <a href='/'>{currentUser.username}</a>
            <a onClick={logout}>Logout</a>
          </Navbar.Text>
          )
          :
          (
          <Navbar.Text>
            <a href="/login">Login</a>
          </Navbar.Text>
          )
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;