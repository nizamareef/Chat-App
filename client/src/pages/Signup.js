import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate=useNavigate()
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [confirmpassword,setConfirmpassword]=useState()
    const [pic,setPic]=useState()
    const[picLoading,setPicLoading]=useState(false)
    
    const submitHandler=async(e)=>{
      e.preventDefault();
      setPicLoading(true);
      if(!name || !email || !password || !confirmpassword){
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
          
      setPicLoading(false);
      return;
      }
      if(password !==confirmpassword){
        toast.error('Password did not match!', {
          position: "top-center",
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
        const config={
          headers:{
            'Content-type':'application/json'
          }
        }
        const {data}=await axios.post("http://localhost:5000/api/auth/register",{
          name,email,password,pic
        },config )
        console.log(data)
        toast.success('Registered Successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          localStorage.setItem('details',JSON.stringify(data))
          navigate('/chats')
          setPicLoading(false)
      } catch (error) {
        toast.error('Registration Failed!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setPicLoading(false)
      }
    }
    
    const handlePic=(pics)=>{
      setPicLoading(true);
      if(pics===undefined){
        toast.warn('Please upload a image!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });  
      }
      if(pics.type==="image/jpeg" || pics.type==="image/png"){ 
        const data =new FormData();
        data.append=('file',pics)
        data.append("upload_preset",'chatapp')
        data.append('cloud_name','areef')
        fetch('https://api.cloudinary.com/v1_1/areef/image/upload',{
          method:'POST',body:data
        })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());   
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      }

    }
  return (
    <div>
       <form>
          <div className="form-group mb-3 d-flex flex-column align-items-start ">
            <label htmlFor="name">Name</label>
            <input onChange={(e)=>setName(e.target.value)} type="text" className="form-control p-1" id="name" name="name" placeholder='Enter Your Name' />
          </div>
          <div className="form-group mb-3 mt-3 d-flex flex-column align-items-start">
            <label htmlFor="email">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} className="form-control p-1" type="email" id="email" name="email" placeholder='Enter Your Email Address' />
          </div>

          <div className="form-group mb-3 d-flex flex-column align-items-start ">
            <label htmlFor="password">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} className="form-control p-1" type="password" id="password" name="password" placeholder='Enter Password' />
          </div>
          <div className="form-group mb-3 d-flex flex-column align-items-start ">
            <label htmlFor="confirm Password">Confirm Password</label>
            <input onChange={(e)=>setConfirmpassword(e.target.value)}  className="form-control p-1" type="password" id="confirm Password" name="confirm Password" placeholder=' Confirm Password' />
          </div>
          <div className="mb-3">
            <label for="picture" className="form-label">Upload Your profile pic</label>
            <input onChange={(e)=>setPic(e.target.value)} onClick={handlePic}  className="form-control" type="file" id="picture" />
          </div>
          <div className='d-grid'>
            <button className=' btn btn-danger mt-3' type="submit" onClick={submitHandler}>Sign Up</button></div>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Signup
