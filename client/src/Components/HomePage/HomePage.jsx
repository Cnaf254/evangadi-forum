import React, { useContext, useEffect, useState } from 'react';
import "./HomePage.css";
import Question from '../Question/Question';
import { userProvider } from '../../Context/UserProvider';
import { useNavigate } from 'react-router-dom';
import axios from "../axios";
import { QuestionContext } from '../../Context/QuestionContext';
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(userProvider);
  const { questions, setQuestions } = useContext(QuestionContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  function handleClick() {
    navigate("/ask");
  }

  useEffect(() => {
    async function fetchAllQuestions() {
      try {
        const response = await axios.get("/question/all_questions", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuestions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    }
    fetchAllQuestions();
  }, [token, setQuestions]);

  return (
    <div className="container">
      <div className="homp">
        <div className="row hed mb-5">
          <div className="col-md-6 d-flex justify-content-center justify-content-md-start">
            <button onClick={handleClick} className="qb">
              Ask Question
            </button>
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
            <h4 className="wel">Welcome : {user.userName}</h4>
          </div>
        </div>
        <h3 className="ns">Questions</h3>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        questions.map((question, index) => (
          <Question
            key={index}
            title={question.title}
            username={question.username}
            questionid={question.questionid}
          />
        ))
      )}
    </div>
  );
}

export default HomePage;
