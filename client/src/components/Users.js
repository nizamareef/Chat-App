import React, { useContext, useEffect, useState } from 'react'
import Chatcontext from '../context/Chatcontext';
import Box from '../pages/Box';
import axios from 'axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import { getSender } from '../config/ChatLogics';
import Badge from '../pages/Badge';
import Spinner from '../pages/Spinner';

const Users = ({ fetchAgain }) => {
  const { user, chats, setChats, setSelectedChat, selectedChat } = useContext(Chatcontext)
  const [isClicked, setIsClicked] = useState(false);
  const [search, setSearch] = useState(' ')
  const [loggedUser, setLoggedUser] = useState()
  const [selectedUser, setSelectedUser] = useState([]);
  const [groupName, setGroupName] = useState();
const [loading, setLoading] = useState(false);  
  const handleDelete = async (delUser) => {
    setSelectedUser(selectedUser.filter((sel) => sel._id !== delUser._id))
  }
  const handleSubmit = async () => {
    if (!groupName || !selectedUser) {
      toast.warning('Fill all the details', {
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
      const config = {
        headers: {
          'Content-type': 'application/json',
          'auth-token': authToken
        }
      }
      const data = await axios.post('http://localhost:5000/api/chat/group', { name: groupName, users: JSON.stringify(selectedUser.map((e) => e._id)) }, config)
      console.log(data)
      setChats([...chats, data])
    }

    catch (error) {
      console.error('Error creating group chat:', error);
    }
  }
  

  console.log(loggedUser)
  const handleGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      toast.warning('User is Already added', {
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
    setSelectedUser([...selectedUser, userToAdd])
    console.log("her", selectedUser)

  }
  console.log("hey", selectedUser)
  const handleSearch = async (query) => {
    // setSearch(query)
    if (!query) {
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
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const authToken = userInfo?.authtoken;
  const userId = userInfo?.user._id
  const fetchChats = async () => {

    const config = {
      headers: {
        'Content-type': 'application/json',
        'auth-token': authToken
      }
    }
    setLoading(true)
    const { data } = await axios.get(`http://localhost:5000/api/chat/chats/${userId}`, config)
    const chatsWithUserDetails = data.map(chat => ({
      ...chat,
      users: chat.users.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
      })),
    }));
    setChats(chatsWithUserDetails)
    setLoading(false)
    console.log(data)
  }
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
    fetchChats()
  }, [fetchAgain])





  return (<div className={`d-${selectedChat ? "none" : "flex"} d-md-flex`}
    style={{
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem",
      backgroundColor: "rgb(214 229 229)",
      height: "100vh",
      borderRadius: "10px",
      border: "1px solid #ced4da",
      margin: "5px"
    }}  >
    <div className="pb-3 px-3 fs-5 font-work-sans d-flex w-100 justify-content-between align-items-center" >
      <p className='fs-3 m-3'><strong>Chats</strong></p>
      <button className='m-3 btn btn-secondary fs-5' data-bs-toggle="modal" data-bs-target="#staticBackdrop1" style={{ color: "white", backgroundColor: "#38B2AC" }} >Group <i className="bi bi-plus" /></button>
    </div >
    {/* MODEL */}
    <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content " style={{backgroundColor:"rgb(214 229 229)"}}>
          <div className="modal-header">
            <h1 className="modal-title m-2 text-dark fs-2 mx-auto " id="staticBackdropLabel">Create Group Chat</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          :<input type="text" style={{ margin: "0px 62px 10px 62px", borderRadius: "5px", padding: "8px" }} placeholder='Enter Group Name' onChange={(e) => setGroupName(e.target.value)} />
          <input type="text" onChange={(e) => handleSearch(e.target.value)} style={{ padding: "8px", borderRadius: "5px", margin: "0px 62px 15px 62px" }} placeholder='Add the user ' />
          <div className="d-flex flex-wrap" style={{ width: "100%" }}>{selectedUser.map((e) => <Badge key={user._id} user={e} handleFunction={() => handleDelete(e)} />)}</div>
          {Array.isArray(search) ? (
            search.slice(0, 3).map((user) => (
              <div className=''style={{margin:"2% 5% 2% 5%"}} key={user.id}>
                <Box user={user} handleFunction={() => handleGroup(user)} />
              </div>
            ))
          ) : <h3 className='mx-auto'>No user found </h3>}
          <div className="d-flex flex-row-reverse m-3">
            <button type="button" className="btn btn- " style={{backgroundColor:"#38B2AC"}}onClick={handleSubmit}>Create Group</button>
          </div>
        </div>
      </div>
    </div>

    <div className="d-flex flex-column p-3" style={{ width: "90%", height: "100%", overflowY: "scroll" }}>
      {!loading ? (
        chats.map((e) => {
          return <div onClick={() => setSelectedChat(e)}
            className="cursor-pointer  rounded-lg"
            style={{

            }}
            key={e._id}>
            <div className="card mb-1 mr-3" style={{
              height: "4rem", width: "", margin: "0.1rem", background: selectedChat === e ? "#38B2AC" : "rgb(255 255 255)",
              color: selectedChat === e ? "white" : "black",
            }}>
              <div className="d-flex align-items-center">
                <div className="m-3">
                  <p className=" mx-auto "><strong>{e.isGroupChat
                    ? e.chatName
                    : e.users && e.users.length > 0 ? getSender(loggedUser, e.users) : 'Unknown Sender'}</strong></p>
                </div>

              </div>
            </div>
          </div>
          // }

        })
      ) : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><Spinner/></div>}
    </div>
    <ToastContainer />

  </div>


  )
}

export default Users
