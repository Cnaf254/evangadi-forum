import React, { useContext, useState } from "react";
import "./SignIn.css";
import { userProvider } from "../../Context/UserProvider";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function SignIn({ toggleForm }) {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [user, setUser] = useContext(userProvider);

  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function logIn(data) {
    try {
      const response = await axios.post("/users/login", {
        password: data.password,
        email: data.email,
      });

      localStorage.setItem("token", response.data.token);
      // console.log(data)
      setUser({
        userName: response.data.userName,
        userId: response.data.userid,
      });

      // console.log(response);

      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the "invalid credential" error here
        alert("Invalid credentials. Please check your email and password.");

        // You can set this error message to display in your UI or perform any other actions
      } else {
        console.log("Something went wrong:", error.message);
        // Handle other error scenarios if needed
      }
    }
  }

  return (
    <div className="login__container col-md">
      <h4>Login to your account </h4>
      <p>
        Don’t have an account?
        <Link className="create" onClick={toggleForm}>
          Create a new account
        </Link>
      </p>
      <form onSubmit={handleSubmit(logIn)}>
        <input
          type="text"
          className={errors.email && "invalid"}
          placeholder=" Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          onKeyUp={() => {
            trigger("email");
          }}
        />

        <input
          type={passwordVisible ? "password" : "text"}
          className={` hide ${errors.password && "invalid"}`}
          placeholder=" Your Password"
          {...register("password", {
            required: "Password is required",

            minLength: {
              value: 8,
              message: "Minimum password length is 8", // JS only: <p>error message</p> TS only support string
            },
          })}
          onKeyUp={() => {
            trigger("password");
          }}
        />
        <i onClick={togglePasswordVisibility}>
          {passwordVisible ? (
            <i className="fas fa-eye-slash" />
          ) : (
            <i className="fas fa-eye" />
          )}
        </i>
        <button className="login__signInButton " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignIn;