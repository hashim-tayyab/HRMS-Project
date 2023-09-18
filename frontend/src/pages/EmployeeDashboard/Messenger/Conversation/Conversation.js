import React, { useEffect, useState } from 'react';
import './Conversation.css';
import axios from 'axios';

function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    // console.log("friendId", conversation);
    const getUser = async () =>{
      const res = await axios.get(`http://localhost:4000/employee/${friendId}`);
      // console.log("res", res)
      setUser(res.data);
    }
    getUser();
  }, [currentUser, conversation])


  return (
    <div className='conversation'>
        <img  
        className='conversationImg'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU'
        alt=''
        />{user? (
        <span className='conversationUsername'>{user.username}</span>
         ):(
          <span></span>
         ) } 
   </div>
  )
}

export default Conversation