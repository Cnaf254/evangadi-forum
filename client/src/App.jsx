import React, { useEffect, useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';
import Home from './Pages/HomePage/Home';
import Landing from './Pages/LandingPage/Landing';
import PostQuestion from './Pages/AskQuestionPage/AskQuestion'
import Answer from './Pages/QuestionDetailAndAnswerPage/QuestionDetailAndAnswer'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'


export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [question, setQuestion] = useState({});

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get('/users/check', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      // console.log(data)
      setUser(data);
    } catch (error) {
      navigate('/');
      
    }
  }

  async function getQuestion() {
    try {
      const { data } = await axios.get('/questions/all-questions', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      // console.log(data)
      setQuestion(data); // Assuming `data` holds the question value
    } catch (error) {
      
      console.error('Error fetching question:', error);
    }
  }

  useEffect(() => {
    checkUser();
    getQuestion();
  }, []); // Add token as a dependency

  return (
    <AppState.Provider value={{ user, setUser, question, setQuestion }}>
      <Header />
      <Routes>
        {user && <Route path='/home' element={<Home />} />}
        {user && <Route path='/postquestion' element={<PostQuestion />} />}
        <Route path='/' element={<Landing />} />
        
        <Route path='/answer' element={<Answer />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;