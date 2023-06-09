import axios from "axios";
import "./Answer.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";

function Answer() {
  const [userData, setUserData] = useContext(UserContext);
  const [post, setPost] = useState({});
  const [form, setForm] = useState({});
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(userData.singleQuestion);
  useEffect(() => {
    if (!userData.user) {
      navigate("/login")
    }
    const fetch = async () => {
      const response = await axios.post(
        `http://localhost:4000/api/questions/id`,
        {
          post_id: userData.singleQuestion.post_id,
        }
      );
      // console.log(response);
      setPost(response.data.data);
    };
    fetch();
  }, [userData.user]);

  useEffect(() => {
    const get = async () => {
      const res = await axios.post(`http://localhost:4000/api/answers/all`, {
        question_id: userData.singleQuestion.question_id,
      });
      console.log(res);
      setAnswer(res.data.data);
    };
    get();
  }, [answer.length]);

  console.log(post);
  const handleChange = (e) => {
    setForm({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4000/api/answers`, {
      answer: form.answer,
      user_id: userData.user.id,
      question_id: post.question_id,
    });
    if(answer.length == 0) {
      setAnswer(['']);
      console.log(answer)
    }
    else {
      setAnswer([]);
    }
    
    setForm({ answer: "" });
  };
  console.log(answer);
  console.log(post);

  // if (performance.navigation.type === 1) {
  //   // page was just refreshed:
  //   window.location.href = '/';
  // }  

  // if(answer.length == 0) navigate('/');
  return (
    // <div className="answer">
    //   <h3 style={{ fontSize: "18px", fontWeight: "500" }}>Question</h3>
    //   <h5 style={{ marginTop: "-15px", fontSize: "15px" }}>{post?.question}</h5>
    //   <p style={{ marginTop: "-15px", fontSize: "12px" }}>
    //     {post?.question_description}
    //   </p>
    //   <hr />
    //   <h3>Answer From The Community</h3>
    //   <hr />
    //   {answer &&
    //     answer?.map((item) => (
    //       <div>
    //         <div className="answer__info">
    //           <div>
    //             <AccountCircleTwoToneIcon style={{ fontSize: "60px" }} />
    //             <p style={{ marginTop: "-10px", fontSize: "13px" }}>
    //               {item.user_name}
    //             </p>
    //           </div>

    //           <p style={{ paddingLeft: "20px" }}>{item.answer}</p>
    //         </div>
    //         <hr />
    //       </div>
    //     ))}

    //   <div className="answer__write">
    //     <h2>Answer The Top Questions</h2>
    //     <div className="question__link">
    //       <Link to="/home"> Go to question page</Link>
    //     </div>
    //     <br />
    //   </div>

    //   <form onSubmit={handleSubmit}>
    //     <textarea
    //       style={{
    //         borderRadius: "8px",
    //         border: "1px solid gray",
    //       }}
    //       name="answer"
    //       id=""
    //       cols="110"
    //       rows="10"
    //       placeholder="Your Answer here"
    //       value={form.answer}
    //       onChange={handleChange}
    //     ></textarea>
    //     <br />
    //     <br />
    //     <div className="answer__button">
    //       {" "}
    //       <button style={{ marginTop: "-15px" }}>Post Your Answer</button>
    //     </div>
    //   </form>
    // </div>

    <div className="answer">
      <hr />
      <div className="answer__conatiner">
        <h5> Question</h5>
        <h5 className="question__line mb-3">{post?.question}</h5>
        <p style={{ marginTop: "-15px", fontSize: "10px" }}>
          {post?.question_description}
        </p>
        <hr />
        <h5 className="answer__community">Answer From The Community</h5>
        <hr />
        {answer &&
          answer?.map((item) => (
            <div>
              <div className="answer__info">
                <div className="question__icon">
                  <div className="icon">
                    <span>
                      <AccountCircleTwoToneIcon style={{ fontSize: "60px" }} />
                      <p className="mx-3"> {item.user_name}</p>
                    </span>
                  </div>
                  <div className="answer__desc mt-4">{item.answer}</div>
                </div>
              </div>
            </div>
          ))}

        <div className="answer__box ">
          <div className="answer__topQuestion">Answer The Top Questions</div>

          <div className="answer__link link mb-1 ">
            <Link to="/"> Go to question page</Link>
          </div>
          <br />

          <form onSubmit={handleSubmit}>
            <textarea
              className="question__form " 
              name="answer"
              id=""
              cols="110"
              rows="10"
              placeholder="Your Answer here"
              value={form.answer}
              onChange={handleChange}
            ></textarea>
            <br />
            <br />
            <div className="answer__button">
              <button>Post Your Answer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
