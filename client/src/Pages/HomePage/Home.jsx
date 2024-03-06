import {useContext} from 'react'
import {AppState}  from '../../App'
import { BsPersonCircle } from "react-icons/bs";
import { FaGreaterThan } from "react-icons/fa";
import {Link,useNavigate} from     'react-router-dom'
import Header from '../../Components/Header/Header'

// import axios from '../axiosConfig'



function Home(props) {
  const navigate=useNavigate()

 
  const {user} = useContext(AppState)
  const {question} = useContext(AppState)
 

  // console.log(question)
  // console.log(question)
  return (
    <>
    <Header />
    <section className="bg-body-tertiary">
   
   <div className="d-flex justify-content-around pt-5 ">
    <button onClick={() => navigate('/postquestion')} className="btn btn-primary action-btn px-5">
    Ask Question
    </button>
    <p className="fw-semibold"><span className="text-warning">Welcome:</span>  {user.username}</p>
</div>
   <div className="container mt-5">
    <h2>Questions</h2>

    {question.allquestion && question.allquestion.map((item, index) => (
  <Link className="text-decoration-none text-black" key={index} to={`/answer?title=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&questionid=${encodeURIComponent(item.questionid)}`}>
    <hr />
    <div className="d-flex justify-content-between align-items-center ">
      
      <div className="d-flex flex-column align-items-center gap-3">
        {/* user */}
        <div className="user-icon"><BsPersonCircle /></div>
        <div>{item.username}</div>
      </div>
      <div>
        {/* question */}
        <p>{item.title}</p>
      </div>
      <div>
        {/* arrow */}
        <FaGreaterThan/>
      </div>
    </div>
  </Link>
))}

 </div>




    {/* <div>
<Link to={"/postquestion"}><button   >Ask Question</button></Link>
  
  <h2>Welcome: {user.username}</h2>
</div>
<div>
  
 
  {question.allquestion && question.allquestion.map((item, index) => (
    
  <div key={index}>
    <div>
      <div><BsPersonCircle/></div>
      <small>{item.username}</small>
    </div>
    
    <Link to={`/answer?title=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&questionid=${encodeURIComponent(item.questionid)}`}>
              <p>{item.title}</p>
            </Link>

    <div><FaGreaterThan/></div>
    <br/>
  </div>
))}

  
</div>  */}
      
      

    </section>
    </>
  )
}

export default Home;