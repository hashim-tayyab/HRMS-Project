import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import { UserContext } from "../../../components/Context/userContext";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./LeaveApply.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from 'react-bootstrap/Dropdown';
import { Table } from "react-bootstrap";

function LeaveApply() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [leaveApplied, setLeaveApplied] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [admins, setAdmins] = useState([]);

  function formatDate(date){
    var date = new Date(date);
    var fullDate = date.toString().split(' ')[1]+' '+date.getDate() +',' + date.getFullYear();
    return fullDate;
  }
  useEffect(() => {
    const getleaves = async () => {
      if (currentUser) {
        const getLeaveApplied = await axios.get(
          `http://localhost:4000/viewemployeeleaves/${currentUser._id}`
        );
        if (getLeaveApplied) {
            console.log(getLeaveApplied);
          setLeaveApplied(getLeaveApplied.data);
        }

        const getApprovingPerson = await axios.get('http://localhost:4000/adminlist');
        if(getApprovingPerson) {
            setAdmins(getApprovingPerson.data);
        }

      }
    };
    getleaves();
  }, [currentUser]);

  const handleLeaveSubmit = async () => {
    try {
      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      console.log(currentUser._id);
      const req = await axios.post(
        `http://localhost:4000/applyleave/${currentUser._id}`,
        {
          admin: "64fffdb87a7d46dab2a5923d",
          dateApplied: date,
          appliedFrom: startDate,
          appliedTill: endDate,
        }
      );
      navigate("/employeedashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card className="leaveApply">
              <h2 className="applyheader">Leave Application</h2>
              <br />
              <div className="start_date">
                <div className="selStart">Start date: </div>
                <DatePicker
                showIcon={true}
                  className="startDate"
                  selected={startDate}
                  onChange={(startDate) => {
                    setStartDate(startDate);
                  }}
                />
              </div>
              <div className="start_date">
                <div className="selEnd">End date: </div>
                <DatePicker 
                className="endDate"
                showIcon = {true}
                  selected={endDate}
                  onChange={(endDate) => {
                    setEndDate(endDate);
                  }}
                />
              </div>
              <div className="start_date">
                <div>Approving Person: </div>
              <Dropdown>
                <Dropdown.Toggle style={{backgroundColor: 'transparent', 
                color: 'black', width:'340px', borderColor: 'gainsboro'}} id="dropdown-basic">
                   <span style={{textAlign: 'start'}}>Select..</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  { admins.map((admin) =>  (                  
                    <Dropdown.Item key={admin._id} href="#/action-1">{admin.username}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="start_date">
                <div>Reason: </div>
                <textarea style={{width: '340px', borderRadius: '10px', borderColor: 'gainsboro'}}></textarea>
              </div>
              <div>
                <Button variant="secondary" onClick={handleLeaveSubmit}>
                  Submit Request
                </Button>
              </div>
            </Card>
          </Col>
          <Col>
            <div>
              {leaveApplied ? (
               <>
                <Card className="leaveApply">
                <h2 className="applyheader">Previous Leaves</h2>
                <Table className='tb' style={{padding: '0.2rem'}}>
                <thead>
                  <tr>
                    <th>FROM</th>
                    <th>TO</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
               {leaveApplied.map((l) => { return (
                    <tr key={l._id}>
                        <td>{formatDate(l.appliedFrom)}</td>
                        <td>{formatDate(l.appliedTill)}</td>
                        <td>{l.reqStatus}</td>
                    </tr>
              )})}</tbody></Table>
               </Card>

              </>
              ) : (
                <div>No leaves applied</div>
              )}{" "}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LeaveApply;
