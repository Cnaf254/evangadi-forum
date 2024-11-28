import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/UserProvider';
import { QuestionProvider } from './Context/QuestionContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <QuestionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuestionProvider>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals