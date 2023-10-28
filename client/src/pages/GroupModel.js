import React, { useContext, useState } from 'react'
import { AiFillSetting } from 'react-icons/ai';
import Chatcontext from '../context/Chatcontext';
import { ToastContainer, toast } from 'react-toastify';
import Badge from './Badge';
import axios from 'axios';
import Box from './Box';

function GroupModel({fetchAgain,setFetchAgain,fetchMessages}) {
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const[loading,setLoading]=useState(false)
    const[reNameLoading,setReNameLoading]=useState(false)
    const{selectedChat,setSelectedChat,user}=useContext(Chatcontext)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const authToken = userInfo?.authtoken; 
    const handleSearch=async(query)=>{
        if(!query){
          return 
        }
        const config = {
          headers: {
            'Content-type': 'application/json'
          }
        }
        const { data } = await axios.get(`http://localhost:5000/api/chat/search/${query}`)
        setSearch(data)
    
      }

    const handleRemove=async(user1)=>{
        if(selectedChat.groupAdmin._id!==user.user._id && user1._id!==user.user._id){
            toast.warning('Only Admins Can Remove', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              return
        }

        try {
            setLoading(true)
            const config={
                headers: {
                    'Content-type': 'application/json'
                  }
            }
            const{data}=await axios.post("http://localhost:5000/api/chat/removeuser",{
                chatId:selectedChat._id,
                userId:user1._id
            },config)
            user1._id===user._id ?setSelectedChat():setSelectedChat(data)
            setFetchAgain(fetchAgain)
            fetchMessages()
            setLoading(false)
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
              setLoading(false)
        }
    }
    
    const handleRename=async()=>{
        if(!groupChatName)return

        try {
            setReNameLoading(true)
            const config={
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":authToken
                }
            }
            const {data}=await axios.post("http://localhost:5000/api/chat/rename",{chatId:selectedChat._id,
        chatName:groupChatName},config)
        setSelectedChat(data)
        setFetchAgain(!fetchAgain)
        setReNameLoading(false)
            
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
              setReNameLoading(false)
        }
        setGroupChatName("")

    }
    
    const handleAdd=async(user1)=>{
        if(selectedChat.users.find((u)=>u._id===user1._id)){
            toast.warning('User Already in the group', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              return
        }
        if(selectedChat.groupAdmin._id !== user.user._id){
            toast.warning('Only Admins Can Add', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              return;
        }
        try {
            setLoading(true)
            const config={
                headers:{
                    'Content-Type':'application/json',
                    "auth-token":authToken
                }
            }
            const {data}=await axios.post("http://localhost:5000/api/chat/add",{
                chatId:selectedChat._id,
                userId:user1._id
            },config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
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
              setLoading(false)
        }

    }
  return (
    <>
    <span className="plain-text mx-3 " style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop3"><AiFillSetting size="25"/></span>


    <div className="modal fade" id="staticBackdrop3"  data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content " style={{backgroundColor:"rgb(214 229 229)"}} >
          <div className="modal-header">
            <h1 className="modal-title m-2 text-dark fs-2 mx-auto "  id="staticBackdropLabel">{selectedChat.chatName.toUpperCase()}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <p className='mx-auto mt-3' style={{color:"dark"}}><strong>Group Members</strong></p>
          <div className=" mt-3 d-flex flex-wrap" style={{ width: "100%"}} >{selectedChat.users.map((e)=><Badge key={user._id} user={e} handleFunction={()=>handleRemove(e)}/>)}</div>
          <div className=' mt-3 mx-auto d-flex '>
            <input style={{borderRadius:"5px", }}type="text" placeholder='Rename the Group ' value={groupChatName } onChange={(e)=>setGroupChatName(e.target.value)} />
            <button className='  btn btn-secondary ' style={{backgroundColor:"#38B2AC",marginLeft:"10px"}} onClick={handleRename}>Update</button>
          </div>
          <input type="text" placeholder='Search User to Add' style={{margin:"5%", borderRadius:"5px"}} onChange={(e)=>handleSearch(e.target.value)} />
          {Array.isArray(search) ? (
  search.slice(0,3).map((user) => (
    <div className='' style={{margin:"2% 5% 2% 5%"}} key={user.id}>
      <Box user={user} handleFunction={()=>handleAdd(user)} />
    </div>
  ))
) : <h3 className='mx-auto'>No user found </h3>}
          <div className="d-flex flex-row-reverse m-3" >
            <button className="btn btn-danger" onClick={()=>handleRemove(user)}>Leave Group</button></div>
        </div>
      </div>
    </div>

    <ToastContainer />
    </>
  )
}

export default GroupModel
