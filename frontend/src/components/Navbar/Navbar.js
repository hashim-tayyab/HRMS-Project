import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect, useContext } from 'react';
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
    <Navbar>
        <Navbar.Brand href="#home">Welcome to HRMS</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {isLoggedIn? 
        (
        <Navbar.Text>
      <div>
         <Dropdown
          align={{ lg: 'end' }}>
          <Dropdown.Toggle  id="dropdown-basic">
          {currentUser.username}
          <Navbar.Brand href="#home">
            {currentUser.imageUrl? (
              <>
            <img
              src= {currentUser.imageUrl}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            </>
            ):(
            <>
              <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTQ3UJipAxvQpwl7MffTRf5Ia0InpL_IZZw&usqp=CAU"
              width="30"
              height="30"
            />
            </>
              )
            }
          </Navbar.Brand>
          </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          <Dropdown.Item href="/applyleave">Leave Apply</Dropdown.Item>


          <Dropdown.Item href='/fellowemployees'>View Employees</Dropdown.Item>


          </Dropdown.Menu>
        </Dropdown>
      </div>
          </Navbar.Text>
          )
          :
          (
          <Navbar.Text>
            <a href="/">Login</a>
          </Navbar.Text>
          )
        }
        </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;