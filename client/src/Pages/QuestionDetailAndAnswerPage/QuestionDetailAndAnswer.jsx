import React,{useRef,useState,useContext,useEffect} from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { FaArrowCircleRight } from "react-icons/fa";
import {useNavigate,useLocation} from 'react-router-dom'
import axios from '../../axiosConfig.js'
import {AppState}  from '../../App.jsx'

function Answer() {
  const location = useLocation();
  const navigate=useNavigate()

  // Parse the query string to extract the title and description
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title');
  const description = queryParams.get('description');

  const questionid = queryParams.get('questionid');

  const {user} = useContext(AppState)
  
//  console.log(questionid,user.userid)
  
  
  const [data, setData] = useState({});

  const token = localStorage.getItem('token');
    
    
    
  const answerDom= useRef(null)
  

  async function handleSubmit(e){
    e.preventDefault();
    const answerValue = answerDom.current.value
    const userid=user.userid
     
    
    if(!questionid || !userid || !answerValue ){
      alert('please provide all required fields')
      return;
    }
    
  try {
   await axios.post('/answers/postanswers',{
    userid:userid,
    questionid:questionid,
    
    answer:answerValue,
    
   },{ headers: {
    Authorization: 'Bearer ' + token,
  }})
  answerDom.current.value = '';
   
  alert('answer posted succesfully')
  window.location.reload();

 
   
    } catch (error) {
    alert(' something went wrong')
    console.log(error.response)
  }
 
  
  }
  async function getAnswer() {
    try {
      
      const response = await axios.get('/answers/all-answers', {
        headers: {
          Authorization: 'Bearer ' + token,
          questionid:questionid,
        }
       
      });
      //  console.log(questionid)
  
      // console.log(response.data); // Log the response data
      setData(response.data);
    } catch (error) {
      
      console.log(error.response);
      
    }
  }
  
  
  useEffect(() => {
 
    getAnswer();
     }, []);

  return (
    <section>
     <div>
      <h1>Question</h1>
      
      
      <p><FaArrowCircleRight /> {title}</p>
      
      <small>{description}</small>
     
     </div>
     <div>
      <p>Answer From The Community</p>
     </div>
     <div>
  
 
  {data.allanswer && data.allanswer.map((item, index) => (
    
  <div key={index}>
    <div>
      <div><BsPersonCircle/></div>
      <small>{user.username}</small>
    </div>
    
    <div>{item.answer}</div>
    
    <br/>
  </div>
))}

  
</div>
<div>
<form onSubmit={handleSubmit} action="">
        
        
     <div>
       <textarea type="text" ref={answerDom} placeholder='Your answer ...'/> 
       </div>

       
       <button type='submit'>Post Question</button>
       
       
   </form>
</div>
    </section>
  )
}

export default Answer