import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
// import {decodeToken} from 'react-jwt';
// import {Logout} from '../Logout/Logout';
import { UserContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';




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
            {/* Signed in as: <a href='/'>{currentUser.username}</a> */}
      <div>
        <Dropdown>
          <Dropdown.Toggle  id="dropdown-basic">
          {currentUser.username}
          </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          <Dropdown.Item href="/applyleave">Leave Apply</Dropdown.Item>
          {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
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