import React, { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics'
import Chatcontext from '../context/Chatcontext'
import Avatar from 'react-avatar'

import {
    Tooltip
  } from 'react-tippy';

function ScrollableChat({messages}) {
    const {user}=useContext(Chatcontext)
  return (
    
      <ScrollableFeed>
        {messages && messages.map((m,i)=>
        <div style={{display:"flex"}} key={m._id}>
            {
                (isSameSender(messages, m, i, user.user._id) || isLastMessage(messages, i, user.user._id)) &&(  <Tooltip
                    title={m.sender.name}
                    position='bottom'
                    effect="solid"><Avatar size="50" alt={m.sender.name} src={m.sender.pic} />
                </Tooltip>)
            } 
            <span style={{ backgroundColor:`${m.sender._id === user.user._id ?"rgb(214, 229, 229)":"#d9d5d5"}`,borderRadius:"20px" ,padding:"5px 15px ",maxWidth:"75%", marginLeft: isSameSenderMargin(messages, m, i, user.user._id),marginTop: isSameUser(messages, m, i, user.user._id) ? 3 : 10,}}>{m.content}</span>
        </div>)}
      </ScrollableFeed>
    
  )
}

export default ScrollableChat
