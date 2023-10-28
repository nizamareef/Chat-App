import React, { useContext, useEffect, useState } from 'react'
import '../App.css';
import Login from './Login';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';
import Chatcontext from '../context/Chatcontext';

const Home = () => {
  const {user}=useContext(Chatcontext)
  const navigate=useNavigate();
  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem('userInfo'))
    if(userInfo){
      navigate('/')
    }
  },[navigate])
  
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [showSignUpForm, setShowSignUpForm] = useState(false)

  const handleLoginClick = () => {
    setShowLoginForm(true)
    setShowSignUpForm(false)
  }
  const handleSignUp = () => {
    setShowLoginForm(false)
    setShowSignUpForm(true)
  }
  return (
    <div className=' d-flex justify-content-center align-items-center  vh-100 ' style={{backgroundColor:"#38B2AC"}}>
      <div className=' custom-width p-5 rounded ' style={{backgroundColor:"rgb(214 229 229)"}}>
        <ul className="nav nav-pills mb-3  justify-content-center " id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"  onClick={handleLoginClick}>Login</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={handleSignUp}>SignUp</button>
          </li>
        </ul>
        {showLoginForm && <Login/>}
        {showSignUpForm && <Signup />}
      </div>
    </div>

  )
}

export default Home
