import React, { useContext } from "react";
import { LoginApi } from "../../context/authContext/apiCalls";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { useHistory } from "react-router-dom";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BasicModal from "../../components/modal/Modal";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./Login.scss";

const Login = () => {
  const { dispatch: loaderDispatch, isLoader } = useContext(LoaderContext);
  const { dispatch: loginDispatch, error, errorMsg } = useContext(AuthContext);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(5),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    sessionStorage.removeItem("key");
    LoginApi(loginDispatch, data, history, loaderDispatch, loaderStart);
  };

  return isLoader ? (
    <BasicModal state={isLoader} />
  ) : (
    <div className="login">
      <div className="logo">NetFlix Admin </div>
      <form action="" className="loginform" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="email"
          {...register("email")}
          className={`${errors.email ? "is-invalid" : ""}`}
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="password"
          {...register("password")}
          className={`${errors.password ? "is-invalid" : ""}`}
          autoComplete="off"
        />
        {error && <span className="errormsg">{errorMsg}</span>}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
