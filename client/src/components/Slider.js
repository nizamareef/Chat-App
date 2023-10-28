import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import {
  Tooltip
} from 'react-tippy';
import Chatcontext from '../context/Chatcontext';
import axios from 'axios';
import Box from '../pages/Box';
import Spinner from '../pages/Spinner';
const Slider = (e) => {
  const [search, setSearch] = useState('')
  const [searchResult,setSearchResult]=useState([])
  const [loading, setLoading] = useState(false)
  const[loadingChat,setLoadingChat]=useState()
  const[isUser,setIsUser]=useState(null)
  const { user,setUser,chats,selectedChat,setSelectedChat,setChats} = useContext(Chatcontext)
  // console.log(user.user.email)
 useEffect(()=>{
  const userData=JSON.parse(localStorage.getItem('userInfo'))
 if(userData){
  setUser(userData)
 }
 },[setUser])
  const handleLogout = () => {
    localStorage.removeItem('userInfo')
  }
  const handleAccess = async(userId)=>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const authToken = userInfo?.authtoken; 
  setLoading(true)
  try{
    const config = {
      headers: {
        'Content-type': 'application/json',
         'auth-token':authToken
      }
    }
    const {data} = await axios.post(`http://localhost:5000/api/chat/accessChat`,{userId},config)
    if(!chats.find((c)=>c._id===data._id))setChats([data,...chats])
    setSelectedChat(data)
    setLoading(false)
  }
catch{
  toast.error('Error in fetching data', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}}
 
  
  const handleSearch = async () => {
    if (!search) {
      toast.error('Please Enter the Name', {
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
    try {
      setLoading(true)
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }
      const { data } = await axios.get(`http://localhost:5000/api/chat/search/${search}`)
      setSearchResult(data)
      console.log(data)
      

    } catch (error) {
      setSearchResult('No user found')
      console.log("No user found")
    }
  }

  return (<>
    <div className='d-flex justify-content-between align-items-center bg-light text-dark p-3 w-100' style={{ height: "50px" }}>
      <Tooltip
        title='Search User'
        position='bottom'
        effect="solid">
        <a className="btn btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          <AiOutlineSearch /> Search User
        </a>
      </Tooltip>
      <div className='d-flex '>
        <div className="dropdown">
          <div className=" dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <FaUserCircle size={30} />


          </div>
          <ul className="dropdown-menu">
            <li><span className="plain-text mx-3 " style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">My Profile</span></li>
            <li><a className="dropdown-item"  >{user.user.email}</a></li>
            <li><a className="dropdown-item" onClick={handleLogout} href="/">Logout</a></li>
          </ul>
        </div>


      </div>
    </div>
    {/* slider */}

    <div className=" offcanvas offcanvas-start " style={{ overflowY: "auto", backgroundColor:"rgb(214 229 229)",width: "310px" }} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className=' fs-4 my-3 mx-3'><strong>Search User</strong>
      </div>

      <div className="my-3">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search User' className='mx-2' />
        <button className='btn btn' style={{backgroundColor:"#38B2AC"}}onClick={handleSearch}>Search</button>
      </div>
      {Array.isArray(searchResult)?(searchResult.map((user)=>{
        return<div  key={user._id}>
          <Box user={user}  handleFunction={() => {
    handleAccess(user._id);
    document.getElementById("offcanvasExample").classList.remove("show");
  }}
  data-bs-dismiss="offcanvas" />
          </div>
      })):loadingChat ?<Spinner ml='auto' d="flex"/>:<h3 className='mx-auto mt-'>No User Found</h3>}
      <div>
        
      </div>
    </div>

    {/* model */}
    <div className="modal fade" id="staticBackdrop"  data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{backgroundColor:"rgb(214 229 229)",}} >
          <div className="modal-header" >
            <h1 className="modal-title m-2 text-black fs-2 mx-auto "  id="staticBackdropLabel" >My Profile </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <img src={user.user.pic} className=" rounded-circle mx-auto m-3" alt="User Profile" width='150px' height='150px'></img>
          <p className='mx-auto text-black fs-4' >Email :{user.user.email}</p>
          <p className='mx-auto text-black fs-4' >Name :{user.user.name}</p>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>
  )
}

export default Slider
