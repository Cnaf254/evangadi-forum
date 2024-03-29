import {useRef,useState} from 'react'
import axios from '../../axiosConfig'
import {Link,useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import './login.css'

const LogIn = ({setCurrentPage}) => {
  const navigate=useNavigate()
  const emailDom=useRef(null)
  const passwordDom=useRef(null)
  const [visible,setVisible]=useState(true)
  
  const togglePassword = () => {
     setVisible(!visible)
  }
  async function handleSubmit(e) {
    e.preventDefault();
  
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
  
    
    if (!emailValue || !passwordValue) {
      toast.error('Please provide all required fields!', {
        position: "bottom-right",
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
      const { data } = await axios.post('/users/login', {
        email: emailValue,
        password: passwordValue
      });
  
      toast.success(data.msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
      navigate('/home');
      window.location.reload();
      localStorage.setItem("token", data.token);
    } catch (error) {
      if (error.response.status === 400 && error.response.data.error === "invalid credential") {
        toast.error("Invalid email or password!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("An error occurred. Please try again later!", {
          position: "bottom-right",
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
  }
  

  return (
    <div className="col card p-5 text-center mt-5" >
     <div>
      <h3 className="m-3">Login to your account</h3>
      <p className="mb-5">Don't have an account? <a href="#" onClick={()=>setCurrentPage("signup")}  className="fw-semibold text-decoration-none text-warning">Create a new account</a></p>
     </div> 
     <form onSubmit={handleSubmit} action="">
      <div className="d-flex flex-column gap-3">
       <input type="email" ref={emailDom} className="form-control p-3" placeholder='Email Address'/>
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
      <div className="mt-3">
        <p className="d-flex justify-content-end">
          <a href="#"  className="fw-semibold text-decoration-none text-warning">Forgot Password</a>
        </p>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary action-btn fs-5 fw-semibold">Log In</button>
      </div>
     </form>
    </div>
  ) 
}

export default LogIn