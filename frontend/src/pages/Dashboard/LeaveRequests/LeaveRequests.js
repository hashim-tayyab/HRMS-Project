import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../components/Context/userContext';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import './LeaveRequests.css';
import Button from 'react-bootstrap/esm/Button';

function LeaveRequests() {

  const {currentUser} = useContext(UserContext);
  const [leaves, setLeaves] = useState([]);
  const [empData, setEmpData] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState();
  
  useEffect(() => {
    const getLeaves = async () => {
    const leaveList = await axios.get(`http://localhost:4000/viewleave/${currentUser?._id}`).then((response) =>{
      setLeaves(response.data);
    },[]);

  }

    getLeaves();
  },[currentUser]);

  // const getEmployeeData = async (empId) => {
  //     try {
  //       const response = await axios.get(`http://localhost:4000/employee/${empId}`)
  //       return response.data;      
  //     }catch (error) {
  //       console.log(error);
  //     }
  //   ;
  // }

  // useEffect(() => {
  //   const fetchData =  () => {
  //       leaves.map( async (leave) => {
  //         try {
  //           var result = await getEmployeeData(leave.employee);
  //           setEmpData((prevData) => [...prevData, result]);
  //           console.log(empData);
  //           const uniqueEmpData = [...new Set(empData)];
  //           console.log(uniqueEmpData)
  //           setEmpData(uniqueEmpData);
  //           // setEmpData([result]);
  //         } catch (error) {
  //           console.error(`Error fetching data for employee ${leave.employee}:`, error);
  //         }
  //       })
  //   }
  //   fetchData();
  // }, [leaves]);


  const updateLeaveStatus = async (empId, _status) => {
    try {
      setLeaveStatus(_status);
      await axios.post(`http://localhost:4000/updaterequest/${empId}`, {
        status: _status,
      })
    } catch (error) {
      
    }
  }

  return (
    <>
      {leaves ? (
        <>
          {leaves.map((leave) => (
            <Card className='leavecards' style={{height: 'fit-content'}} key={leave._id}>
              <Card.Title>Name: {leave.employee.username}</Card.Title>
              <Card.Subtitle>
              <Dropdown>
                <span>Status: </span>
                <Dropdown.Toggle  variant='outline-secondary'  style={{}}>
                  {leave.reqStatus}
                    {/* {leave.reqStatus}  */}
                  <Dropdown.Menu>
                    {" "}
                    <Dropdown.Item onClick={(e) => setLeaveStatus(e.target.innerHTML + "ed")
                      }>
                      Accept
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => setLeaveStatus(e.target.innerHTML + "ed")
                      }>
                      Reject
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown>
              </Card.Subtitle>
              <Button style={{width:'fit-content', marginTop: '20px'}} 
              onClick={() =>updateLeaveStatus(leave.employee._id, leaveStatus)}>Save and Close</Button>
            </Card>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );


// return (
//   <div>
//     {empData ? (
//     <>
//         {empData.map((data, index) => (
//           <div key={empData[index]._id}>
//          {/* <div key={leaves[index]._id}> */}
//         <Card style={{height: 'fit-content'}}>
//           {data ? (
//             <div>
//               <p>Name: {data.username}</p>
//               <Dropdown>
//               <span>Status: </span>
//                 <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
//                 {/* {leaves[index].reqStatus} */}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item 
//                     onClick={(e) => updateLeaveStatus(leaves[index].employee, e.target.innerHTML+"ed")}
//                     >Accept</Dropdown.Item>
//                   <Dropdown.Item
//                     onClick={(e) => updateLeaveStatus(leaves[index].employee, e.target.innerHTML+"ed")}
//                   >Reject</Dropdown.Item>
//                 </Dropdown.Menu>
//             </Dropdown>
//             </div>
//           ) : (
//             <p>Error: Invalid employee data</p>
//           )}
//         </Card>

//         </div>
//       ))}
//       </>
//       ):(
//       <></>
//       )
//       }
//   </div>
//   )
}

export default LeaveRequests