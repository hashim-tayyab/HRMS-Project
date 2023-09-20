import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../components/Context/userContext';
import {Card, Table} from 'react-bootstrap';
import {StatusContext} from '../../../components/Context/statusContext';
import axios from 'axios';
import './GetAttendance.css'

function GetAttendance() {

  const {currentUser, setCurrentUser} = useContext(UserContext);
  const {adminStatus, setAdminStatus} = useContext(StatusContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [attendance, setAttendance] = useState([]);


  function formatDate(date){
    var date = new Date(date);
    var fullDate = date.toString().split(' ')[1]+''+date.getDate() +',' + date.getFullYear();
    return fullDate;
  }

  function formatTime(time){
    if(time !==null){
      var time = new Date(time);
      var fullTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
      return fullTime;
    }
    else return '...'
  }
  function timeSpent(outTime, inTime){
    var inT = new Date(inTime);
    var outT = new Date(outTime);
    var time =  new Date(outT - inT);
    if(outTime !== null){  
      return time.getHours()-5+":"+time.getMinutes()+":"+time.getSeconds();
    }
    else{
      return '...';
    }
  }


    useEffect(() => {
      const getAttendance = async () => {
        if(currentUser && !adminStatus){
          const r = await axios.get(`http://localhost:4000/attendance/${currentUser._id}`);
          if(r.data !== null && r.data !== ""){
            setAttendance(r.data.prevAttendance);
            setIsLoaded(true);
          }
        }
      }
      getAttendance();
    }, [currentUser]);


  return (
    <div>
       
        <Card className='attCard' style={{backgroundColor:'gainsboro'}}>
            <Card.Body>
              <Table className='tb' style={{padding: '0.2rem'}}>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>IN</th>
                    <th>OUT</th>
                    <th>DURATION</th>
                  </tr>
                </thead>
                {isLoaded?(
                  <tbody>
                {attendance.map((att) => 
                  <tr key={att._id}>
                    <td style={{width:'90px'}}>{formatDate(att.date)}</td>
                    <td>{formatTime(att.check_in_time)}</td>
                    <td>{formatTime(att.check_out_time)}</td>
                    <td>{timeSpent(att.check_out_time, att.check_in_time)}</td>
                  </tr>
                  )}
                </tbody>  
                ):(
                  <tbody>
                    <tr>
                    <td style={{width:'90px'}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                )  
                }        
              </Table>
            </Card.Body>
          </Card>
    </div>
  )
}

export default GetAttendance