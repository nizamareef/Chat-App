import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Chatcontext from '../context/Chatcontext';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';
import { getSender } from '../config/ChatLogics';
import GroupModel from './GroupModel';
import ScrollableChat from './ScrollableChat';
import Spinner from '../pages/Spinner';
import axios from 'axios';
import io from "socket.io-client"
import "./style.css"

 const ENDPOINT="http://localhost:5000";
 var socket,selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat,notification, setNotification } = useContext(Chatcontext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
const [newMessage, setNewMessage] = useState();
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const authToken = userInfo?.authtoken; 
    useEffect(() => {
      socket= io(ENDPOINT)
      socket.emit("setup",user);
      socket.on("connected",()=>{setSocketConnected(true)})
      socket.on("typing",()=>setIsTyping(true))
      socket.on("stop typing",()=>setIsTyping(false))
  }, []);
    const fetchMessages=async()=>{
      if(!selectedChat)return;

      try {
        const config={
          headers:{
            'Content-ype': 'application/json',
            'auth-token':authToken
            }
        }
        setLoading(true)
        const {data}= await axios.get(`http://localhost:5000/api/messages/allMessages/${selectedChat._id}`,config)
        console.log("messages",messages)
        setMessages(data)
        setLoading(false)
        socket.emit("join Chat",selectedChat._id)
      } catch (error) {
        toast.error('Error Occured', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
    useEffect(()=>{
      fetchMessages()
      selectedChatCompare=selectedChat;
    },[selectedChat])
    console.log("noti",notification)

    useEffect(()=>{
      socket.on("message received",(newMessageReceived)=>{
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
          if(!notification.includes(newMessageReceived)){
            setNotification([newMessageReceived,...notification])
            setFetchAgain(!fetchAgain)
          }
        }
        else{
          setMessages([...messages,newMessageReceived ])
        }
      })
    })
    

const typingHandler=async(e)=>{
  setNewMessage(e.target.value)
  if(!socketConnected) return;

  if(!typing){
    setTyping(true)
    socket.emit("typing",selectedChat._id)
  }

  let lastTypingTime= new Date().getTime();
  var timerLength=3000; 
  setTimeout(()=>{
    var timeNow =new Date().getTime();
    var timeDiff =timeNow - lastTypingTime;
    if(timeDiff>=timerLength && typing){
      socket.emit("stop typing",selectedChat._id)
      setTyping(false)
    }
  },timerLength)
}
const sendMessage=async()=>{
  if(newMessage){
    socket.emit("stop typing",selectedChat._id)
    try {
      const config={
        headers:{
          'Content-ype': 'application/json',
          'auth-token':authToken
          }
      }
      setNewMessage("")

      const {data}= await axios.post("http://localhost:5000/api/messages/messages",{content:newMessage,
      chatId:selectedChat._id},config)
      console.log(data)
      socket.emit('new message',data)
      setMessages([...messages,data])
    } catch (error) {
      toast.error('Error Occured', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
}

  return (
    <>
      {selectedChat ? (
        <>
          <div className="d-flex justify-content-between align-items-center" style={{ margin: "10px", width: "100%" }}>
            <AiOutlineArrowLeft size="25" onClick={() => setSelectedChat("")} />
            {!selectedChat.isGroupChat ? (
              <><p className="mx-auto fs-3">{getSender(user, selectedChat.users).toUpperCase()}</p></>
            ) : (
              <><p className="mx-auto fs-3">{selectedChat.chatName.toUpperCase()}</p> 
              <GroupModel fetchMessages={fetchMessages} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/></>
            )}
          </div>
          <div className="d-flex flex-column justify-content-end p-3 bg-light w-100" style={{ overflowY: "hidden", height: "90vh", borderRadius: "10px" }}>
           {loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><Spinner/></div>:(<> 
           <div className='messages'>
              <ScrollableChat messages={messages}/>
             </div></>)}
             {isTyping ? <div>Loading...</div>:<></>}
           <div style={{ display: "flex", alignItems: "center" }}>
  <input onChange={typingHandler} value={newMessage} style={{ padding: "5px", borderRadius: "8px", flex: 1 }} type="text" placeholder="Enter the message" />
  <p style={{ marginLeft: "10px",marginTop:"10px"}} onClick={sendMessage}>
    <MdSend size="30" />
  </p>
</div>

          </div>
        </>
      ) : (
        <div className='d-flex align-items-center h-100' >
          <p className='fs-2'>Click a user to start a conversation</p>
        </div>
      )}
        <ToastContainer />
    </>
  );
}

export default SingleChat;
