import {useRef} from 'react'
import axios from '../axiosConfig'
import {Link,useNavigate} from 'react-router-dom'

function Login() {
  const navigate=useNavigate()
  const emailDom=useRef(null)
  const passwordDom=useRef(null)

  async function handleSubmit(e){
    e.preventDefault();
    
    const emailValue = emailDom.current.value
    const passwordValue = passwordDom.current.value
    if( !emailValue || !passwordValue){
      alert('please provide all required fields')
      return;
    }
    
  try {
   const {data} = await axios.post('/users/login',{
    
    email:emailValue,
    password:passwordValue
   })
   alert('register successfull please login')
    // navigate('/')
  localStorage.setItem("token",data.token)
   console.log(data)
  } catch (error) {
    alert(error?.response?.data?.error)
    console.log(error.response.data)
  }
  
  }

  return (
    <section>
    <form onSubmit={handleSubmit} action="">
     
     
      <div>
        <span> email :--- </span>
        <input type="text" ref={emailDom} placeholder='email'/>
        </div>
        <br/>
      <div>
        <span>password :--- </span>
        <input type="text" ref={passwordDom} placeholder='password'/>
        </div>
        <button type='submit'>Login</button>
    </form>
    <Link to={'/register'}>Register</Link>
  </section>
  )
}

export default Login