import {useContext,useState,useEffect} from 'react'
import {AppState}  from '../../App'
import { BsPersonCircle } from "react-icons/bs";
import { FaGreaterThan } from "react-icons/fa";
import {Link,useNavigate} from     'react-router-dom'


// import axios from '../axiosConfig'



function Home(props) {
  const navigate=useNavigate()
  const [load,setLoad]=useState(true)

 
  const {user} = useContext(AppState)
  const {question} = useContext(AppState)
  const [reloaded, setReloaded] = useState(false);

  const handleLinkClick = () => {
    if (!reloaded) {
      localStorage.setItem('reloaded', 'true');
      setReloaded(true);
    }
  };
 
  
    
   
  
  return (
    
    
    <section className="bg-body-tertiary pt-5 home">
   
   <div className="d-flex justify-content-between align-items-center  ask p-2 pt-md-5">
    <button onClick={() =>{
      localStorage.setItem('reloaded', 'true');
      navigate('/postquestion')
      
    } } className="btn btn-primary action-btn px-5 ">
    Ask Question
    </button>
    <p className="fw-semibold"><span className="text-warning">Welcome:</span>  {user.username}</p>
</div>
   <div className="container mt-5">
    <h2>Questions</h2>

    {question.allquestion && question.allquestion.map((item, index) => (
  <Link onClick={handleLinkClick} className="text-decoration-none text-black" key={index} to={`/answer?title=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&questionid=${encodeURIComponent(item.questionid)}&reload=true`}>
    <hr />
    <div className="d-flex justify-content-between align-items-center ">
    <div class="d-flex flex-column flex-md-row gap-md-5">
    <div className="d-flex flex-column gap-2">
        {/* user */}
        <div className="user-icon"><BsPersonCircle /></div>
        <div>{item.username}</div>
      </div >
      <div className="">
        {/* question */}
        <p className="text-start mt-4">{item.title}</p>
      </div>
</div>

      
      <div>
        {/* arrow */}
        <FaGreaterThan/>
      </div>
    </div>
  </Link>
))}

 </div>




 
      
      

    </section>
    
  )
}

export default Home;