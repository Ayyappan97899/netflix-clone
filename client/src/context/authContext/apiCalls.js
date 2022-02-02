import api from "../../api.config";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerSuccess,
  registerStart,
} from "./AuthActions";

//login

export const LoginApi = async (dispatch, user, navigate) => {
  try {
    dispatch(loginStart());
    const res = await api.post("auth/login", user);
    localStorage.setItem("login", JSON.stringify(res.data));
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

//register

export const RegisterApi = async (
  dispatch,
  data,
  navigate,
  setemail,
  setusername
) => {
  try {
    dispatch(registerStart());
    const res = await api.post("auth/register", data);
    dispatch(registerSuccess(res.data));
    navigate("/login", { replace: true });
  } catch (err) {
    dispatch(registerFailure(err.response.data));
    if (err.response.data.includes("username")) {
      setusername(false);
    } else {
      setemail(false);
    }
  }
};
