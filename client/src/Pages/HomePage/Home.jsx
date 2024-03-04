import {useContext} from 'react'
import {AppState}  from '../../App'
import { BsPersonCircle } from "react-icons/bs";
import { FaGreaterThan } from "react-icons/fa";
import {Link} from 'react-router-dom'

// import axios from '../axiosConfig'



function Home() {
  // const navigate=Navigate()

 
  const {user} = useContext(AppState)
  const {question} = useContext(AppState)
 

  // console.log(question)
  // console.log(question)
  return (
    <section >
    <div>
<Link to={"/postquestion"}><button>Ask Question</button></Link>
  
  <h2>Welcome: {user.username}</h2>
</div>
<div>
  
  {/* Mapping over allquestion array and rendering each title */}
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

  
</div> 
      
      

    </section>
  )
}

export default Home