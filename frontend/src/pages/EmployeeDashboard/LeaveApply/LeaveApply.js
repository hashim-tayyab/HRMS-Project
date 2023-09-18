import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { UserContext } from '../../../components/Context/userContext';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LeaveApply() {



    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // const [start_date, set_start_date] = useState();
    // const [end_date, set_end_date] = useState();
    const [leaveApplied, setLeaveApplied] = useState();
    const {currentUser, setCurrentUser} = useContext(UserContext);

    useEffect( () => {
        const getleaves = async () => {
            if (currentUser){
                const getLeaveApplied = await axios.get(`http://localhost:4000/viewemployeeleaves/${currentUser._id}`);
            if(getLeaveApplied){
                setLeaveApplied(getLeaveApplied.data);
            }
        }}
        getleaves();
    }, [leaveApplied, setLeaveApplied, currentUser, setCurrentUser]);

    const handleLeaveSubmit = async () => {
        try { 
            var today = new Date();
            var date = today.getDate()+'-'+(today.getMonth()+1)+ '-'+today.getFullYear();
            console.log(currentUser._id);
            const req = await axios.post(`http://localhost:4000/applyleave/${currentUser._id}`, {
                admin: '64fffdb87a7d46dab2a5923d',
                dateApplied: date,
                appliedFrom: startDate,
                appliedTill: endDate,
            });
            navigate('/employeedashboard');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <h2>Apply for leave</h2><br/>
        <div className='start_date'>
            <div>Select Start date: </div>
            <DatePicker selected={startDate} onChange={(startDate) => {
                setStartDate(startDate)
                // set_start_date(startDate.getDate()+'-'+(startDate.getMonth()+1)+'-'+startDate.getFullYear());
                }} />
        </div>
        <div className='end_date'>
            <div>Select End date: </div>
            <DatePicker selected={endDate} onChange={(endDate) => {
                setEndDate(endDate)
                // set_end_date(endDate.getDate()+'-'+(endDate.getMonth()+1)+'-'+endDate.getFullYear());
                }} />
        </div>
        <div>
            <button onClick={handleLeaveSubmit}>Submit Request</button>
        </div>
        
        <div>
            {leaveApplied ?
            (
                <div>
                    {leaveApplied.appliedFrom}
                </div>
            )
            :
            (
            <div>
                No leaves applied
            </div>
            )
}        </div>
    </div>
  )
}

export default LeaveApply;