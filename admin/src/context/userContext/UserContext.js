import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  users: [],
  user: [],
  error: false,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        user: state.user,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
