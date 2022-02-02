import React, { useContext, useState } from "react";
import { LoginApi } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../components/modal/Modal";
import "./Login.scss";

const Login = () => {
  const { dispatch, loginError, loginErrorMsg, isFetching } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const signHandler = () => {
    navigate("/register");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await LoginApi(dispatch, data, navigate);
  };

  const logo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png";
  return isFetching ? (
    <BasicModal state={isFetching} />
  ) : (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="Netflix" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            name="email"
            placeholder="email address "
            onChange={changeHandler}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={changeHandler}
          />
          {loginError && <span className="invalidMsg">{loginErrorMsg}</span>}
          <button className="loginBtn" onClick={submitHandler}>
            Sign In
          </button>
          <span>
            New to Netflix?{" "}
            <b style={{ cursor: "pointer" }} onClick={signHandler}>
              Sign up now.
            </b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you'r not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
