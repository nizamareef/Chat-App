import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
function Badge({user,handleFunction}) {
  return (
    <div >
      <span className="badge badge-success" style={{backgroundColor:"green ",padding: "5px 10px", borderRadius: "10px",margin: "5px", fontSize: "12px",cursor: "pointer"}}
  onClick={handleFunction}>{user.name} <AiOutlineClose/></span>

    </div>
  )
}

export default Badge
