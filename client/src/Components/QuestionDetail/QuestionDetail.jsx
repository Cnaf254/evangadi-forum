import React, { useContext, useEffect, useState } from 'react';
import "./QuestionDetail.css";
import { useParams } from 'react-router-dom';
import { QuestionContext } from '../../Context/QuestionContext';
import axios from "../axios";
import { userProvider } from '../../Context/UserProvider';
import { useForm } from "react-hook-form";

function QuestionDetail() {

   const {
     register,
     trigger,
     handleSubmit,
     formState: { errors },
      setValue,
   } = useForm();

  
 const token = localStorage.getItem("token")

  const [user, setUser] = useContext(userProvider)

  console.log(user)

 const { questions, setQuestions } = useContext(QuestionContext)
 const { questionid } = useParams();
 const [dbAnswer, setdbAnswer] = useState([])


 
  useEffect(() => {
    async function getAns() {
      try {
        const ans = await axios.get(
          `/answer/community_answer/${questionid}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

       setdbAnswer(ans.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (questionid) {
      getAns();
    }
  }, [questionid]);


  const selectedQuestion = questions.find(
    (ques) => ques.questionid == questionid
  );

  useEffect(() => {
    console.log("Updated dbAnswer:", dbAnswer);
  }, [dbAnswer]);

// console.log(questions)



  async function handleClick(data) {
    try {
      await axios.post(
        "/answer/post",
        {
          answer: data.answer,
          questionid: questionid,
          userid: user.userId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const ans = await axios.get(
        `/answer/community_answer/${questionid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the dbAnswer state with the fetched answers
      setdbAnswer(ans.data.data);
      setValue("answer", ""); // Clear the textarea after posting
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="top container">
      <div>
        <h4>Question</h4>
      </div>
      <div>
        <h5>{selectedQuestion?.title}</h5>
      </div>
      <div>
        <p>{selectedQuestion?.description}</p>
      </div>
      <div className="border-top border-bottom h65">
        <h4 className="question_answer">Answer From The Community</h4>
      </div>

      {dbAnswer.map((answerData, index) => (
        <div className="row info_question" key={index}>
          <div className="col-md-4 d-flex flex-column align-items-md-center my-md-auto">
            {/* Display user icon */}
            <i className="fas fa-user-circle fa-3x user" />
            {/* Display username */}
            <p className="username">{answerData.username}</p>
          </div>
          <div className="col-md-3 my-auto">
            {/* Display answer */}
            <p className="answer-text">{answerData.answer}</p>
          </div>
        </div>
      ))}

      <div className="answer text-center mb-5">
        <h2 className="pt-5">Answer The Top Question.</h2>
        <p>Go to Question page</p>

        <textarea
          className={`w-75 ${errors.answer ? "is-invalid" : ""}`}
          rows="6"
          placeholder="Your answer....."
          {...register("answer", {
            required: "Answer is required",
            maxLength: {
              value: 300,
              message: "Maximum allowed length is 300 characters",
            },
          })}
          onKeyUp={() => {
            trigger("answer");
          }}
        />
        
        {errors.answer && (
          <div className="invalid-feedback">
            <small className="text-danger">{errors.answer.message}</small>
          </div>
        )}
        <div>
          <button
            className="btn btn-success mb-5 mt-3"
            onClick={handleSubmit(handleClick)}
          >
            Post Your Answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;