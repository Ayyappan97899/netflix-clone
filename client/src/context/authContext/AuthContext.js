import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  login: [],
  register: [],
  isFetching: false,
  loginErrorMsg: null,
  loginError: false,
  registerError: false,
  registerErrorMsg: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        login: state.login,
        register: state.register,
        isFetching: state.isFetching,
        loginErrorMsg: state.loginErrorMsg,
        registerErrorMsg: state.registerErrorMsg,
        loginError: state.loginError,
        registerError: state.registerError,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
