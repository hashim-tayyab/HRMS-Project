import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/userContext';
import {StatusContext} from '../Context/statusContext';
import axios from 'axios';
import { Card } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);


const option = {

    maintainAspectRatio: false,
    scales: {
        y: {
          ticks: {
            min: 0,
            max: 10,
            stepSize: 1,
            // suggestedMin: 0.5,
            // suggestedMax: 5.5,
            callback: function(label, index, labels) {
                switch (label) {
                    case 0:
                        return '00:00:00';
                    case 1:
                        return '01:00:00';
                    case 2:
                        return '02:00:00';
                    case 3:
                        return '03:00:00';
                    case 4:
                        return '04:00:00';
                    case 5:
                        return '05:00:00';
                    case 6:
                        return '06:00:00';
                    case 7:
                        return '07:00:00';
                    case 8:
                        return '08:00:00';
                    case 9:
                        return '09:00:00';
                    case 10:
                        return '10:00:00'
                }
            }
        },
          gridLines: {display: false}
        }
       },


    responsive: true,
    plugins: {
    //   legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Attendances Chart",
      },
    },
  };
  

  
  export default function Graph() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {adminStatus, setAdminStatus} = useContext(StatusContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [durationData, setDurationData] = useState([]);
    const [labels, setLabels] = useState([]);
  
  
    function formatDate(date){
      var date = new Date(date);
      var fullDate = date.toString().split(' ')[1]+''+date.getDate() +',' + date.getFullYear();
      return fullDate;
    }
  
    function timeSpent(outTime, inTime){
        var inT = new Date(inTime);
        var outT = new Date(outTime);
        var time =  new Date(outT - inT);
        if(outTime !== null){  
          return time.getTime();
        }
        else{
          return '...';
        }
    }

    function convertToHours(arr){
        const newArr = arr.map((a) => a/3600000);
        return newArr;
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
        if (attendance && isLoaded){
           const getDates =  attendance.map((att) => formatDate(att.date));
            const getDurations = attendance.map((att) =>timeSpent(att.check_out_time, att.check_in_time));
        
            setLabels(getDates);
            setDurationData(getDurations);
            
        }
}, [currentUser, isLoaded]);



const data = {
    labels: labels,
    datasets: [
      {
        label: "Time Duration",
        data: convertToHours(durationData),
        backgroundColor: "green",
      },  
    ],
  
  };

    return (
      <div className="bar-graph">
        <Card style={{backgroundColor: 'gainsboro', padding: '10px'}}>
        <Bar options={option} data={data} />
        </Card>
      </div>
    );
  }