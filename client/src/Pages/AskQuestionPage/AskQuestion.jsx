import React,{useContext,useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {AppState}  from '../../App'
import { useRef } from 'react'
import axios from '../../axiosConfig'
import {useNavigate} from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa";

function PostQuestion() {
  const [message,setMessage]=useState("")
  
    const navigate=useNavigate()
    const {user} = useContext(AppState)
    const token = localStorage.getItem('token');
    
    
    
  const titleDom= useRef(null)
  const descriptionDom= useRef(null)
  const tagDom= useRef(null)

  async function handleSubmit(e){
    e.preventDefault();
    const titleValue = titleDom.current.value
    const descriptionValue = descriptionDom.current.value
    const tagValue = tagDom.current.value
    const questionid = uuidv4();
    const userid=user.userid
    console.log(userid)
    
    if(!questionid || !userid || !titleValue || !descriptionValue || !tagValue){
      alert('please provide all required fields')
      return;
    }
    
  try {
   const response=await axios.post('/questions/postquestions',{
    questionid:questionid,
    userid:userid,
    title:titleValue,
    description:descriptionValue,
    tag:tagValue
   },{ headers: {
    Authorization: 'Bearer ' + token,
  }})
  titleDom.current.value = '';
   descriptionDom.current.value = '';
   tagDom.current.value = '';
   console.log(response,"response")
 
   if(response.status==201){
    setMessage(response.data.msg)
   }
   setTimeout(() => {
      navigate('/home')
      window.location.reload();
   }, 2000);
    
  } catch (error) {
    alert('something went wrong')
    console.log(error.response)
  }
  
  }

   return (
    <section>
 



     <div>
        <h1>Steps To Write A Good Questions</h1>
        <p>
        <FaArrowCircleRight/> Summerize your problem in a one-line-title <br/>
        <FaArrowCircleRight/> Describe your problem in more detail <br/>
        <FaArrowCircleRight/> Describe what you tried and what you expected to happen <br/>
        <FaArrowCircleRight/> Review your question and post it here <br/>
        </p>
     </div>
     <div> 
        <h1>post Your Question </h1>
         <small>{message}</small>
    
        <form onSubmit={handleSubmit} action="">
        
           <div>
          
          <input type="text" ref={titleDom} placeholder='Question title'/>
          </div>
          <br/>
        <div>
          <textarea type="text" ref={descriptionDom} placeholder='Question detail ...'/> 
          </div>

          <div>
          
          <input type="text" ref={tagDom} placeholder='Question tag'/>
          </div>
          <button type='submit'>Post Question</button>
          
          
      </form>
      
     </div>
    </section>
   ) 
 
}

export default PostQuestion