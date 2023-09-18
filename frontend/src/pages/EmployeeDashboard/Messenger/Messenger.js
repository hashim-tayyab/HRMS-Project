import React, {useContext, useEffect, useState} from 'react';
import  Container  from 'react-bootstrap/Container';
import  Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css';
import axios from 'axios';
import {UserContext} from '../../../components/Context/userContext'

function Messenger() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    useEffect(() => {
        const getConversation = async () => {
            try {
                if (currentUser){
                const con = await axios.get(`http://localhost:4000/conversation/${currentUser._id}`);
                // console.log("con.data", con.data);
                setConversation(con.data)}
            } catch (error) {
                console.log(error);
            }
        }
        getConversation();
    }, [currentUser])

    useEffect(() => {
        const getMessages = async () => {
            try {
                if(currentChat){
                    // console.log(currentChat);
                    const res = await axios.get(`http://localhost:4000/getmessage/${currentChat._id}`);
                    // console.log("getting messages: ",res.data)
                    setMessages(res.data);
                }    
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUser._id,
            text :newMessages,
            conversationId: currentChat._id,
        }
        try {
            const sendMessage = await axios.post(`http://localhost:4000/sendmessage`, message);
            setMessages([...messages, sendMessage.data]);
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
        <Container>
            <Row>
                {conversation? (
                <Col>
                {
                conversation.map((c) =>(
                    <div key={c._id} onClick={() => setCurrentChat(c)}>
                    <Conversation  conversation={c} currentUser={currentUser}/>
                    </div>
                ))}
                </Col>):(
                    <Col></Col>
                )
                }
                <Col xs={6}>
                    {currentChat?(
                    <div className='chatboxWrapper'>
                        <div className='chatBoxTop'>
                        {messages.map((m) => (
                            <Message key={m._id} message={m} own = {m.sender === currentUser._id}/>
                        ))}

                        </div>
                        <div className='chatTextArea'>
                                <textarea onChange = {(e) => setNewMessages(e.target.value)} 
                                className='writeMessage' placeholder='...'></textarea>
                                <button onClick={handleSubmit}>Send</button>
                            </div>
                    </div>):(<>Open a conversation</>)
                    }

                </Col>    
                
                <Col>
                    {/* Online */}
                </Col>

            </Row>    
        </Container>
    </div>
  )
}

export default Messenger;