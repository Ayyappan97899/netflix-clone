import api from "../../utils/api.config";
import { loginSuccess, loginFailure } from "./AuthActions";

export const LoginApi = async (
  loginDispatch,
  user,
  history,
  loaderDispatch,
  loaderStart
) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api.post("auth/login", user);
    res.data.isAdmin && localStorage.setItem("user", JSON.stringify(res.data));
    loginDispatch(loginSuccess(res.data));
    history.replace("/");
    loaderDispatch(loaderStart(false));
  } catch (err) {
    loginDispatch(loginFailure(err.response.data));
    loaderDispatch(loaderStart(false));
  }
};
