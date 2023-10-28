import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Chatcontext from '../context/Chatcontext';


function Login() {
  const{setUser}=useContext(Chatcontext)
  const navigate=useNavigate()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [Loading,setLoading]=useState(false);
  

  const handleLogin=async(e)=>{
    e.preventDefault()
    setLoading(true);
    if(!email || !password){
      toast.error('Fill all the details!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setLoading(false);
        return;
    }
    try {
      const config={
        headers:{
          'Content-type':'application/json'
        }
      }
      const {data}=await axios.post('http://localhost:5000/api/auth/login',{email,password},config
      )
      setUser(data)
      localStorage.setItem('userInfo',JSON.stringify(data))
      navigate('/chats')
      toast.success('Login Successfully!', {
        position: "top-center",
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
    catch (error) {
      toast.error('Enter the valid credentials!', {
        position: "top-center",
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
    <div>
       <form>
          <div className="form-group mb-3 mt-3 d-flex flex-column align-items-start">
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) =>setEmail(e.target.value)} className="form-control p-1" type="email" id="email" name="email" placeholder='Enter Your Email Address' />
          </div>
          <div className="form-group mb-3 d-flex flex-column align-items-start ">
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control p-1" type="password" id="password" name="password" placeholder='Enter  Password' />
          </div>
          <div className='d-grid'>
            <button className='btn btn-success mt-3 ' type="login" isLoading='true'  disabled={Loading} onClick={handleLogin}>{Loading ? 'Loading': 'Login'}</button></div>
          <div className='d-grid'>
            <button className=' btn btn-danger mt-3' type="button" onClick={()=>{setEmail("guest@gmail.com"); setPassword("12345")}}>  Get Guest User Credentials</button></div>

        </form>
      <ToastContainer/>  
    </div>
  )
}

export default Login
