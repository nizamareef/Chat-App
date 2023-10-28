import { useState,useEffect} from 'react';
import Chatcontext from './Chatcontext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Chat=({children})=>{
    const navigate=useNavigate()
    const [chats,setChats]=useState([])
    const [selectedChat,setSelectedChat]=useState("")
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState([]);
    const[user,setUser]=useState(null)
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo);
        if(!userInfo){
            navigate("/")
        }},[navigate])

       
return(
<Chatcontext.Provider value={{notification, setNotification, user, setUser,selectedChat,setSelectedChat,chats,setChats }}>
    {children}
</Chatcontext.Provider>
)}

export default Chat