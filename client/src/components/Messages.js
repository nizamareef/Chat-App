import React, { useContext ,useState} from 'react'
import Chatcontext from '../context/Chatcontext';
import SingleChat from '../pages/SingleChat';
import '../App.css';


const Messages = ({fetchAgain,setFetchAgain}) => {
  const{user,selectedChat} =useContext(Chatcontext)
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessages, setNewMessages] = useState();
  return (<> 
  <div  className={`d-${selectedChat ? "flex" : "none"} d-md-flex`}
      style={{
        alignItems: "center",
        flexDirection: "column",
        padding: "1rem",
        backgroundColor: "rgb(214 229 229)",
        width: "100%",
        height:"100vh",
        borderRadius: "10px",
        border: "1px solid #ced4da",
        margin:"5px"
      }}>
<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  </div>

  </>
    
  )
}

export default Messages
