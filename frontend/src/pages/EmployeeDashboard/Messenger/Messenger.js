import React, {useContext, useEffect, useRef, useState} from 'react';
import  Container  from 'react-bootstrap/Container';
import  Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css';
import axios from 'axios';
import {UserContext} from '../../../components/Context/userContext';
import {io} from 'socket.io-client';
import { sendArrow } from '../../../assets/assets';
import SideNavBar from '../Sidebar/Sidebar';

function Messenger() {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    const {currentUser, setCurrentUser} = useContext(UserContext);


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data =>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    },[]);

    useEffect(() => {
        arrivalMessage && currentChat.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage])
    },[arrivalMessage, currentChat]);


    useEffect(() => {
        if(currentUser?._id !== null){
        socket.current.emit("addUser", currentUser?._id);
        socket.current.on("getUsers",users => {
            console.log(users);
        })
    }
    },[currentUser]);


    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[messages]);





    useEffect(() => {
        const getConversation = async () => {
            try {
                if (currentUser){
                const con = await axios.get(`http://localhost:4000/conversation/${currentUser?._id}`);
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
                    const res = await axios.get(`http://localhost:4000/getmessage/${currentChat?._id}`);
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
        const receiverId = currentChat.members.find(member => member !== currentUser._id);
        socket.current.emit("sendMessage", {
            senderId :currentUser._id,
            receiverId,
            text: newMessages
        });
        try {
            const sendMessage = await axios.post(`http://localhost:4000/sendmessage`, message);
            setMessages([...messages, sendMessage.data]);
            setNewMessages("");
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
        
        <Container className='messenger-container'>
       
            <Row>
                {conversation? (
                <Col className='converse-col'>
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
                <Col className='chat-col' xs={8}>
                    <div>Hello</div>
                    {currentChat?(
                    <div className='chatboxWrapper'>
                        <div className='chatBoxTop'>
                        {messages.map((m) => (
                            <div key={m._id} ref={scrollRef}>
                            <Message message={m} own = {m.sender === currentUser._id}/>
                            </div>
                        ))}

                        </div>
                        <div className='textarea-container'>
                                <textarea onChange = {(e) => setNewMessages(e.target.value)} 
                                className='writeMessage' placeholder='Write something..'></textarea>
                                <span className="send-button" onClick={handleSubmit}
                                style={{fontSize: "20px"}}
                                >Send {sendArrow}</span>
                            </div>
                    </div>):(<>Open a conversation</>)
                    }

                </Col>    
                
                {/* <Col> */}
                <SideNavBar/>
                {/* </Col> */}

            </Row>    
        </Container>
    </div>
  )
}

export default Messenger;