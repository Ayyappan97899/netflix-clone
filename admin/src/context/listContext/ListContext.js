import { createContext, useReducer } from "react";
import ListReducer from "./ListReducer";

const INITIAL_STATE = {
  lists: [],
  list: [],
  error: false,
};

export const ListContext = createContext(INITIAL_STATE);

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE);

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        list: state.list,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
