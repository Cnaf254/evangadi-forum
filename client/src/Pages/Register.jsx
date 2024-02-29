import React from 'react'
import { useRef } from 'react'
import axios from '../axiosConfig'
import {Link,useNavigate} from 'react-router-dom'


function Register() {
  const navigate=useNavigate()
  const usernameDom= useRef(null)
  const firstnameDom= useRef(null)
  const lastnameDom= useRef(null)
  const emailDom= useRef(null)
  const passwordDom= useRef(null)



async function handleSubmit(e){
  e.preventDefault();
  const usernameValue = usernameDom.current.value
  const firstnameValue = firstnameDom.current.value
  const lastnameValue = lastnameDom.current.value
  const emailValue = emailDom.current.value
  const passwordValue = passwordDom.current.value
  if(!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue){
    alert('please provide all required fields')
    return;
  }
  
try {
 await axios.post('/users/register',{
  username:usernameValue,
  firstname:firstnameValue,
  lastname:lastnameValue,
  email:emailValue,
  password:passwordValue
 })
 alert('register successfull please login')
 navigate('/login')
} catch (error) {
  alert('something went wrong')
  console.log(error.response)
}

}

  return (
    <section>
      <form onSubmit={handleSubmit} action="">
        <div>
          <span>username :--- </span>
          <input type="text" ref={usernameDom} placeholder='username'/>
          </div>
          <br/>
        <div>
          <span>First name :--- </span>
          <input type="text" ref={firstnameDom}placeholder='first name'/>
          </div>
          <br/>
        <div>
          <span>last name :--- </span>
          <input type="text" ref={lastnameDom}
          placeholder='last name'/>
          </div>
          <br/>
        <div>
          <span> email :--- </span>
          <input type="text" ref={emailDom} placeholder='email'/>
          </div>
          <br/>
        <div>
          <span>password :--- </span>
          <input type="text" ref={passwordDom} placeholder='password'/>
          </div>
          <button type='submit'>Register</button>
      </form>
      <Link to={'/login'}>Login</Link>
    </section>
  )
}

export default Register