import React from "react";
import ReactDOM from "react-dom";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { LoaderContextProvider } from "./context/loaderContext/LoaderContext";
import { ListContextProvider } from "./context/listContext/ListContext";
import { UserContextProvider } from "./context/userContext/UserContext";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <LoaderContextProvider>
      <AuthContextProvider>
        <MovieContextProvider>
          <ListContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </ListContextProvider>
        </MovieContextProvider>
      </AuthContextProvider>
    </LoaderContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
