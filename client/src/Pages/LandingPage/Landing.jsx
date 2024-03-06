import {useState} from 'react'



import Header from '../../Components/Header/Header'
import bg from '../../Images/bg-svg-f.svg'
import SignUp  from '../../Components/SignUp/SignUp'
import LogIn  from '../../Components/LogIn/LogIn'

function Landing() {
  const [currentPage,setCurrentPage]=useState("login")
  

  return (
    <section >
      <Header />
      {/* <div className = {classes.login_container}>
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
      </div> */}
      <main className="landing bg-body-tertiary" style={{background: `url(${bg})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>

    <section className="container d-md-flex pt-5 gap-5">
      
        {/* form */}
        {currentPage === "login" && < LogIn setCurrentPage={setCurrentPage}/>}
        {currentPage === "signup" && < SignUp setCurrentPage={setCurrentPage}/>}
        
      
 
      <div className="col mt-5">
      {/* welcome */}
<p className="text-warning fw-semibold">About</p>
<h1 className="fw-bold">Evangadi Networks Q&A</h1>
<div className="d-flex flex-column gap-4 fs-5">
  <p>No matter what stage of life you are in, whether you're just starting elementary school or being promoted toCEO of a fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>
  <p>wheather you are willing to share your knowledge or you are just looking to meet mentors of your own,please startby joining the netywork here</p>
</div>
<div>
  <button className="btn text-white fw-bold py-2 px-5 mt-3" style={{backgroundColor:"#fe8402"}}>
    HOW IT WORKS
  </button>
</div>
 </div> 
       
    </section>

      </main>
   
  </section>
  )
}

export default Landing