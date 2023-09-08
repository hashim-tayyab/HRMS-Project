import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {decodeToken} from 'react-jwt';

function MyNavbar() {

  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState();
  
  useEffect(() =>{
    const token = localStorage.getItem('token');
    // setToken(token);
    if(token !== null){
      const myDecodedToken = decodeToken(token);
    setDecodedToken(myDecodedToken.id);
    setIsLoggedIn(true);
    }
    const getDetails = async () => {

      if(isLoggedIn === true){
        try{
       await userData().then((res) => {
          setUsername(res.data.username);
          setIsLoggedIn(true);
        });
        } catch(err){
          console.log("Cannot get details", err);
        }
      }
    }
    getDetails()
    ;}, [isLoggedIn]);



  const userData = async () =>{
    return await axios.get(`http://localhost:4000/getuser/${decodedToken}`); 
  }


  return (
    <Navbar className="bg-body-tertiary">
      <Container className='navContainer'>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {isLoggedIn? 
        (
        <Navbar.Text>
            Signed in as: <a href="#login">{username}</a>
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