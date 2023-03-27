import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";



import "./SignUp.css";
function SignUp() {
  const [form, setForm] = useState({});
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
    const [type, setType] = useState("password");
    const [visibility, setVisibilitiy] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToogle = () => {
    if (type === "password") {
      setVisibilitiy(true);
      setType("text");
    } else {
      setVisibilitiy(false);
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post("http://localhost:4000/api/users", form);

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
    }
  };

  return (
    <>
      <div
        id="login__home"
        className="login d-lg-flex d-md-flex d-sm-block d-xs-block "
      >
        <div className="container mx-xs-5">
          <div className="login__heading">
            <h5>
              <b>Join the network</b>
            </h5>
            <p className="already">
              {"Already have an account? "}

              <Link to="/login">Sign in</Link>
            </p>
          </div>
          <div className="login__form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <br />
              <div className="flex">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                <br />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
                <br />
              </div>

              <input
                type="text"
                name="userName"
                placeholder="User Name"
                onChange={handleChange}
              />
              <div className="pass">
                <input
                  className="login__input"
                  type={type}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
                <span className="eye mt-3">
                  <IconButton onClick={handleToogle}>
                    {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </span>
              </div>
              {/* <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              /> */}
              <div className="page">
                <p>
                  {"I agree to the "}
                  <a href="">privacy policy</a> {"and "}
                  <a href="">terms of serivice</a>
                </p>
              </div>
              <button className="btn">Agree and join</button>
            </form>
            <Link className="already" to="/login">
              <p>Already have an account?</p>
            </Link>
          </div>
        </div>
        <div className="login__about  m-xs-5 mb-sm-5  mx-sm-5">
          {/* <About /> */}

          <p className="login__about_about">About</p>
          <div about__title>
            <h1>Evangadi Networks Q&A</h1>
          </div>
          <div className="login__para">
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p>
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
          </div>

          <button>HOW IT WORKS</button>
        </div>
      </div>
    </>

    // <div className="row">
    //   <div className="col-md-6">
    //     <div className="signin">
    //       <div className="signinContainer">
    //         <h5>
    //           <b>Join the network</b>
    //         </h5>
    //         <p className="already">
    //           {"Already have an account? "}

    //           <Link to="/login">Sign in</Link>
    //         </p>
    //         <form onSubmit={handleSubmit}>

    //           <input
    //             type="text"
    //             name="email"
    //             placeholder="Email"
    //             onChange={handleChange}
    //           />
    //           <br />
    //           <div className="flex">

    //             <input
    //               type="text"
    //               name="firstName"
    //               placeholder="First Name"
    //               onChange={handleChange}
    //             />
    //             <br />

    //             <input
    //               type="text"
    //               name="lastName"
    //               placeholder="Last Name"
    //               onChange={handleChange}
    //             />
    //             <br />
    //           </div>

    //           <input
    //             type="text"
    //             name="userName"
    //             placeholder="User Name"
    //             onChange={handleChange}
    //           />

    //           <input
    //             type="password"
    //             name="password"
    //             placeholder="Password"
    //             onChange={handleChange}
    //           />
    //           <div className="page">
    //             <p>
    //               {"I agree to the "}
    //               <a href="">privacy policy</a> {"and "}
    //               <a href="">terms of serivice</a>
    //             </p>
    //           </div>
    //           <button className="btn">Agree and join</button>
    //         </form>

    //         <Link className="already" to="/login">
    //           <p>Already have an account?</p>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>

    //   {/* <div className="login__about">

    //     <p className="login__about_about">About</p>
    //     <div about__title>
    //       <h1>Evangadi Networks Q&A</h1>
    //     </div>
    //     <div className="login__para">
    //       <p>
    //         No matter what stage of life you are in, whether you’re just
    //         starting elementary school or being promoted to CEO of a Fortune 500
    //         company, you have much to offer to those who are trying to follow in
    //         your footsteps.
    //       </p>
    //       <p>
    //         Wheather you are willing to share your knowledge or you are just
    //         looking to meet mentors of your own, please start by joining the
    //         network here.
    //       </p>
    //     </div>

    //     <button>HOW IT WORKS</button>
    //   </div> */}

    //   <dev className="col-md-6 about">
    //     <p className="text">About</p>
    //     <h1>Evangadi Networks</h1>
    //     <div className="lorem">
    //       <p>
    //         No matter what stage of life you are in, whether you’re just
    //         starting elementary school or being promoted to CEO of a Fortune 500
    //         company, you have much to offer to those who are trying to follow in
    //         your footsteps.
    //       </p>

    //       <p>
    //         Wheather you are willing to share your knowledge or you are just
    //         looking to meet mentors of your own, please start by joining the
    //         network here.
    //       </p>
    //       <button className="aboutbtn">HOW IT WORKS</button>
    //     </div>
    //   </dev>
    // </div>
  );
}

export default SignUp;