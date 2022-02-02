import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { RegisterApi } from "../../context/authContext/apiCalls";
import BasicModal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const { dispatch, registerError, registerErrorMsg, isFetching } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const logo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png";
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errorState, seterror] = useState("");

  const emailRef = useRef();
  const userRef = useRef();
  const passwordRef = useRef();

  const emailRegx = new RegExp("[^@]+@[^@]+.[a-zA-Z]{2,}");

  const signHandler = () => {
    navigate("/login");
  };

  const handleStart = () => {
    if (emailRegx.test(emailRef.current.value)) {
      setemail(emailRef.current.value);
      seterror(false);
    } else {
      seterror(true);
      console.log("error");
    }
  };

  const handleUser = () => {
    setusername(userRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setpassword(passwordRef.current.value);

    if (password.length === 6) {
      register();
      seterror(false);
    } else {
      seterror(true);
    }
  };

  const register = async () => {
    await RegisterApi(
      dispatch,
      { email, username, password },
      navigate,
      setemail,
      setusername
    );
  };

  return isFetching ? (
    <BasicModal state={isFetching} />
  ) : (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="Netflix" />
          <button className="loginBtn" onClick={signHandler}>
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, Tv shows and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to Watch, Enter your email to create or restart your membership.
        </p>

        {!email ? (
          <div className="input">
            <input
              type="email"
              placeholder={registerError ? registerErrorMsg : "email address"}
              ref={emailRef}
              className={
                registerError ? "invalid" : errorState ? "invalid" : ""
              }
            />
            <button className="registerBtn" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <>
            {!username ? (
              <div className="input">
                <input
                  type="text"
                  placeholder={registerError ? registerErrorMsg : "username"}
                  className={registerError ? "invalid" : ""}
                  ref={userRef}
                />
                <button className="registerBtn" onClick={handleUser}>
                  Get Started
                </button>
              </div>
            ) : (
              <form className="input">
                <input
                  type="password"
                  placeholder="Password"
                  min="6"
                  ref={passwordRef}
                  className={
                    registerError ? "invalid" : errorState ? "invalid" : ""
                  }
                  required
                />
                <button className="registerBtn" onClick={handleFinish}>
                  Start
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
