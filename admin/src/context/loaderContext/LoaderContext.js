import React, { createContext, useReducer } from "react";
import LoaderReducer from "./LoaderReducer";

const INITIAL_STATE = {
  isLoader: false,
};

export const LoaderContext = createContext(INITIAL_STATE);

export const LoaderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoaderReducer, INITIAL_STATE);

  return (
    <LoaderContext.Provider
      value={{
        isLoader: state.isLoader,
        dispatch,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
