import React from 'react'
import "./Question.css"
import { useNavigate } from 'react-router-dom';


function Question({title,username,questionid}) {
  const navigate=useNavigate()
  // console.log(questionid)


  function handleClick(){
        navigate(`/question/${questionid}`);
  }


  return (
    <div className="border-top row top_question " onClick={handleClick}>
      <div className="col-md-1 d-flex flex-column align-items-md-center my-md-auto">
        <i className="fas fa-user-circle fa-3x user" />
        <p className="mb-0">{username}</p>
      </div>
      <div className="col-md-3  my-md-auto ">
        <p className=" ">{title}</p>
      </div>
      <div className=" col-md text-md-end   my-md-auto">
        <i className="fas fa-angle-right fa-lg    " />
      </div>
    </div>
  );
}

export default Question