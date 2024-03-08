import React from 'react'
import { useRef,useState } from 'react'
import axios from '../../axiosConfig'
import {Link,useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

const SignUp = ({setCurrentPage}) => {
  
    const navigate=useNavigate()
    const usernameDom= useRef(null)
    const firstnameDom= useRef(null)
    const lastnameDom= useRef(null)
    const emailDom= useRef(null)
    const passwordDom= useRef(null)
    const [visible,setVisible]=useState(true)
  
    const togglePassword = () => {
       setVisible(!visible)
    }
  
  
  
  async function handleSubmit(e){
    e.preventDefault();
    const usernameValue = usernameDom.current.value
    const firstnameValue = firstnameDom.current.value
    const lastnameValue = lastnameDom.current.value
    const emailValue = emailDom.current.value
    const passwordValue = passwordDom.current.value
    if(!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue){
      toast.error('please provide all required fields!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
      return;
    }
    // console.log(passwordValue.length)
    if(passwordValue.length<=8){
      toast.error('The password must be atleast 8', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
      return;
    }
   
    
  try {
   const {data}=await axios.post('/users/register',{
    username:usernameValue,
    firstname:firstnameValue,
    lastname:lastnameValue,
    email:emailValue,
    password:passwordValue
   })
    // console.log(data)
  
  
   toast.success(data?.msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
    });
   navigate('/')
  } catch (error) {
    
    //  console.log(error.response.data)
    

    if(error?.response?.data?.user?.length > 0){
      toast.error(error?.response?.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
        return
    }
    


    toast.error(error?.response?.data?.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
  }
  
  }

  return (
    <div className="col card p-5 text-center">
    <div>
     <h3 className="m-3">Join the network</h3>
     <p className="mb-5">Already have an account? <a href="#" onClick={()=>setCurrentPage("login")}className="fw-semibold text-decoration-none text-warning">Sign in</a></p>
    </div>
    <form onSubmit={handleSubmit} action="">
     <div className="d-flex flex-column gap-3">
      <input ref={emailDom} type="email" className="form-control p-3" placeholder='Email Address'/>

      <div className="d-flex gap-4">
      <input ref={firstnameDom} type="text" className="form-control p-3" placeholder='First Name'/> 

      <input ref={lastnameDom} type="text" className="form-control p-3" placeholder='Last Name'/>
      </div>
      <input ref={usernameDom} type="text" className="form-control p-3" placeholder='User Name'/>

      <div className="input-with-icon">
      <input 
        type={visible ? "text" : "password"} 
        ref={passwordDom} 
        className="form-control p-3 pass-icon" 
        placeholder='Password'
      />
      <FontAwesomeIcon 
        icon={visible ? faEye : faEyeSlash} 
        onClick={togglePassword} 
        className="fa-light icon-eye" 
      />
    </div> 
     </div>
     <div className="p-3">
        <small>I agree to the privacy policy and terms of service.</small>
     </div>
     
     <div className="d-grid">
       <button type="submit" className="btn btn-primary action-btn fs-5 fw-semibold">Agree and Join</button>
     </div>
     <div className="mt-3">
       <p className="d-flex justify-content-center">
         <a href="#" onClick={()=>setCurrentPage("login")} className="fw-semibold text-decoration-none text-warning">Already have an account?</a>
       </p>
     </div>
    </form>
   </div>
  )
}

export default SignUp