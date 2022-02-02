import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./page/login/Login";
import { LoaderContext } from "./context/loaderContext/LoaderContext";
import BasicModal from "./components/modal/Modal";
import ServerError from "./page/serverError/ServerError";
import { UserContext } from "./context/userContext/UserContext";
import { MovieContext } from "./context/movieContext/MovieContext";
import { ListContext } from "./context/listContext/ListContext";
import Routes from "./routes/Routes";

const App = () => {
  const { isLoader } = useContext(LoaderContext);
  const { error: userError } = useContext(UserContext);
  const { error: movieError } = useContext(MovieContext);
  const { error: listError } = useContext(ListContext);

  const user = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  return (
    <Router>
      {userError || movieError || listError ? (
        <ServerError />
      ) : (
        <Router>
          <Switch>
            <Route
              path="/login"
              exact
              render={() =>
                user() ? (
                  isLoader ? (
                    <BasicModal state={isLoader} />
                  ) : (
                    <Redirect to="/" />
                  )
                ) : (
                  <Login />
                )
              }
            />
            <Route render={() => <Routes user={user} />} />
          </Switch>
        </Router>
      )}
    </Router>
  );
};

export default App;
