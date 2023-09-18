import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../components/Context/userContext';
import {Card, Table} from 'react-bootstrap';
import {StatusContext} from '../../../components/Context/statusContext';
import axios from 'axios';

function ViewFellowEmployees() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {adminStatus, setAdminStatus} = useContext(StatusContext);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [empList, setEmpList] = useState([]);
  
    useEffect(() => {
    const getList = async () => {
      if(currentUser && !adminStatus){
        const r = await axios.get(`http://localhost:4000/fellowemployees/${currentUser.companyName}`)
        .then((res) => {
            setEmpList(res.data);
        })}
    }
    getList();
  }, [currentUser]);

  return (
    <div>
        {empList?(
        <>
            {empList.map(emp => {
            return (
            <Card style={{ width: '10rem', height: '8rem' }} key={emp._id}>
                <Card.Body>
                    <Card.Title>{emp.username}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{emp.position}</Card.Subtitle>
                            {emp.username !== currentUser.username ?(
                            <Card.Link href="/messenger">Send a Message</Card.Link>):(null)}
                </Card.Body>
            </Card> )})}
        </>
        ):(
        <>
            No other employees are here :D
        </>
        ) 
    }
    </div>
  )
}

export default ViewFellowEmployees;








// function GetAttendance() {




//   return (
//     <div>
//        {isLoaded?(
//         <Card className='attCard' style={{backgroundColor:'gainsboro'}}>
//             <Card.Body>
//               <Table className='tb' style={{padding: '0.2rem'}}>
//                 <thead>
//                   <tr>
//                     <th>DATE</th>
//                     <th>IN</th>
//                     <th>OUT</th>
//                     <th>DURATION</th>
//                   </tr>
//                 </thead>
//                   <tbody>
//                 {attendance.map((att) => 
//                   <tr key={att._id}>
//                     <td style={{width:'90px'}}>{formatDate(att.date)}</td>
//                     <td>{formatTime(att.check_in_time)}</td>
//                     <td>{formatTime(att.check_out_time)}</td>
//                     <td>{timeSpent(att.check_out_time, att.check_in_time)}</td>
//                   </tr>
//                   )}
//                 </tbody>            
//               </Table>
//             </Card.Body>
//           </Card>
//       ):(       
//     <>
//       Loading...
//     </>
//     ) 
//     }
//     </div>
//   )
// }

// export default GetAttendance