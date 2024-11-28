import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2>How it Works</h2>
      <div className="how-it-works-content">
        <h3>1. Create an Account</h3>
        <p>Sign up with your first name, last name, username, email, and password. Ensure your email and username are unique.</p>

        <h3>2. Login</h3>
        <p>If you already have an account, log in with your email and password.</p>

        <h3>3. Ask Questions</h3>
        <p>After logging in, you can post your programming-related questions on the Questions Page. Provide a concise title and a detailed description.</p>

        <h3>4. Answer Questions</h3>
        <p>Browse questions posted by other users and provide answers. Your username will be displayed with each answer you post.</p>

        <h3>5. View and Review Questions and Answers</h3>
        <p>Review questions and answers posted by others to enhance your knowledge and help the community.</p>
      </div>
    </div>
  );
}

export default HowItWorks;
