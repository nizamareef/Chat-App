import React, { useContext } from 'react'
import Chatcontext from '../context/Chatcontext'

const Box = ({ user,handleFunction }) => {
    return (
      <div
        onClick={handleFunction}
        className="cursor-pointer bg-light"
        style={{ width: '98%', padding: '8px', backgroundColor:"blue", marginBottom: '8px', borderRadius: '5px' ,}}
      >
        <div className="d-flex align-items-center">
          <img
            src={user.pic}
            alt={user.name}
            className="me-2"
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
          <div>
            <p className='mb-0'><strong>{user.name}</strong></p>
            <p className=" mt-0 ">
               {user.email}
            </p>
          </div>
        </div>
      </div>
    );
  };
  


export default Box
