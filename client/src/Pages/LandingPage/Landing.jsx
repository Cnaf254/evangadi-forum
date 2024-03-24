import {useState} from 'react'




import bg from '../../Images/bg-svg-f.svg'
import SignUp  from '../../Components/SignUp/SignUp'
import LogIn  from '../../Components/LogIn/LogIn'


function Landing() {
  const [currentPage,setCurrentPage]=useState("login")
  

  return (
    
      
      <main className=" bg-body-tertiary pt-5" style={{background: `url(${bg})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>

    <section className="container d-md-flex  gap-5">
      
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
   
  
  )
}

export default Landing