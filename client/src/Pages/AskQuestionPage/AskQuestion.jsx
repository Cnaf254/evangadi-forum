import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import "../../index.css";
import Header from "../../Components/Header/Header";

import axios from "../../axiosConfig";
import { v4 as uuidv4 } from "uuid";
import {AppState} from "../../App";

const AskQuestion = () => {
  const [message,setMessage]=useState("")
  const navigate = useNavigate();
  const {user} = useContext(AppState);
  console.log(user)
  const token = localStorage.getItem("token");

  const titleDom = useRef(null);
  const descriptionDom = useRef(null);
  const tagDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const tagValue = tagDom.current.value;
    const questionid = uuidv4();
    const userid = user.userid;
    console.log(userid,tagValue,titleValue,questionid,descriptionValue);

    if (
      !questionid ||
      !userid ||
      !titleValue ||
      !descriptionValue ||
      !tagValue
    ) {
      alert("please provide all required fields");
      return;
    }

    try {
      const response = await axios.post(
        "/questions/postquestions",
        {
          questionid: questionid,
          userid: userid,
          title: titleValue,
          description: descriptionValue,
          tag: tagValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      titleDom.current.value = "";
      descriptionDom.current.value = "";
      tagDom.current.value = "";
      console.log(response, "response");

       if(response.status==201){
        setMessage(response.data.msg)
       }
      setTimeout(() => {
        navigate("/home");
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("something went wrong");
      console.log(error.response);
    }
  }
  return (
    <section>
      <Header />
      <div className="container d-flex flex-column align-items-center mt-4 ">
        {/* steps and how to write Q  */}
        <div className="justify-content-around ">
          {/*  how to write Q  Title*/}
          <h2>Steps to Write a good questions </h2>
        </div>

        <div>
          {/*step to write Q  */}
          <ul>
            <li> Summarise you problem in one-line title</li>
            <li> Describe your problem in more detail</li>
            <li>Describe what you tried and What you expected to happen </li>
            <li>Review your question and post it to the site </li>
          </ul>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center container  shadow-sm p-3 mb-5 bg-body rounded">
        <div className="mt-5 pt-4">
          {/* Ask Q Part */}
          <div>
            <h3>Ask a Public question </h3>
          </div>
          <div className="align-items-center">
            <p>{message}</p>
          </div>
        </div>

        <div className="container">
          {/* form part */}
          <form action=""    onSubmit={handleSubmit} >
            <div className="mb-2">
              <input
                type="text"
                placeholder="Title"
                className="form-control "
                ref={titleDom}
              />
            </div>
            <div cla>
              {/* <input
              type="text"
              placeholder="Question Description "
              className="form-control py-5  "
            /> */}
              <textarea
                class="form-control p-4"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Question Description "
                ref={descriptionDom}
              ></textarea>
            </div>
            <div>
              <input
                type="text"
                placeholder="tag"
                className="form-control mt-2 "
                ref={tagDom}

              />
            </div>
            <div className=" mt-2">
              <button
                className="btn btn-primary fw-bold px-5 action_btn"
                type="Submit"
              >
                Post your Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AskQuestion;