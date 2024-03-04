import {useRef} from 'react'
import axios from '../../axiosConfig'
import {Link,useNavigate} from 'react-router-dom'
import classes from './landing.module.css'


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
     navigate('/home')
     window.location.reload();
  localStorage.setItem("token",data.token)
   console.log(data)
  } catch (error) {
    alert(error?.response?.data?.error)
    console.log(error.response.data)
  }
  
  }

  return (
    <section className = {classes.container}>
      <div className = {classes.login_container}>
        <h3>Log in to your account</h3>
       <span>
        Don't have an account?
        <Link to={'/register'}>Create a new account</Link>
       </span>
      <form onSubmit={handleSubmit} action="">
     
     
     <div>
       
       <input type="text" ref={emailDom} placeholder='email'/>
       </div>
       <br/>
     <div>
        
       <input type="text" ref={passwordDom} placeholder='password'/>
       </div>
       <button type='submit'>Login</button>
   </form>
   <Link to={'/register'}>Create an account?</Link>
      </div>
      <div className={classes.about_container}>
       <span>About</span>
       <h1>Evangadi Networks Q&A</h1>
       <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, in assumenda. Nostrum consectetur dignissimos in quod voluptatibus. Ad eos hic deleniti quod minima! Quidem quam cupiditate aspernatur eius, perferendis repellendus?
       Veritatis aut ea debitis commodi ipsum. Autem amet, beatae porro labore facilis voluptate ut temporibus repellendus pariatur dolorem velit aliquid nesciunt praesentium quas earum? Vitae quasi tenetur voluptate delectus repudiandae!
       Commodi, alias qui sit ratione esse facere consequuntur omnis modi dicta odit earum eius aperiam, similique animi quaerat quae est possimus laudantium ipsam fuga repellat. Doloremque nulla illum consequatur repudiandae.</span>
      <br/>
       <button>HOW IT WORKS</button>
      </div>
   
  </section>
  )
}

export default Login