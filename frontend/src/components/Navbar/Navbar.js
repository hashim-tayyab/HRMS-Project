import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
// import {decodeToken} from 'react-jwt';
import { UserContext } from '../Context/userContext';


function MyNavbar() {
const {currentUser, setCurrentUser} = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

useEffect(() => {
  if(currentUser){
    setIsLoggedIn(true);
    // console.log(currentUser.username);

  }
}, [currentUser]);


  return (
    <Navbar className="bg-body-tertiary">
      <Container className='navContainer'>
        <Navbar.Brand href="#home">Welcome to HRMS</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {isLoggedIn? 
        (
        <Navbar.Text>
            Signed in as: <a href='/dashboard'>{currentUser.username}</a>
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