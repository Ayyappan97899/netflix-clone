import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import ReactDom from "react-dom";
import { Route, Redirect, Switch } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import TopBar from "../components/topbar/TopBar";
import Error from "../page/error/Error";
import Home from "../page/home/Home";
import Movie from "../page/movie/Movie";
import MovieList from "../page/movieList/MovieList";
import MovieLists from "../page/movieLists/MovieLists";
import Movies from "../page/movies/Movies";
import NewList from "../page/newList/NewList";
import NewMovie from "../page/newMovie/NewMovie";
import NewUser from "../page/newUser/NewUser";
import User from "../page/user/User";
import UserList from "../page/userList/UserList";

const Routes = ({ user }) => {
  const [show, setShow] = useState(false);
  const overlay = document.getElementById("ErrorOverlay");
  return (
    <>
      {!show && <TopBar />}

      <Grid container>
        <div item="true" style={{ display: "flex", width: "100%" }}>
          {!show && <SideBar />}
          <Switch>
            <Route
              path="/"
              exact
              render={() => (user() ? <Home /> : <Redirect to="/login" />)}
            />

            <Route
              path="/users"
              exact
              render={() => (user() ? <UserList /> : <Redirect to="/login" />)}
            />

            <Route
              path="/users/:id"
              exact
              render={() => (user() ? <User /> : <Redirect to="/login" />)}
            />

            <Route
              path="/newUser"
              exact
              render={() => (user() ? <NewUser /> : <Redirect to="/login" />)}
            />

            <Route
              path="/movies"
              exact
              render={() => (user() ? <Movies /> : <Redirect to="/login" />)}
            />

            <Route
              path="/movies/:id"
              exact
              render={() => (user() ? <Movie /> : <Redirect to="/login" />)}
            />

            <Route
              path="/newMovies"
              exact
              render={() => (user() ? <NewMovie /> : <Redirect to="/login" />)}
            />

            <Route
              path="/lists"
              exact
              render={() =>
                user() ? <MovieLists /> : <Redirect to="/login" />
              }
            />

            <Route
              path="/list/:id"
              exact
              render={() => (user() ? <MovieList /> : <Redirect to="/login" />)}
            />

            <Route
              path="/newList"
              exact
              render={() => (user() ? <NewList /> : <Redirect to="/login" />)}
            />
            <Route
              render={() =>
                ReactDom.createPortal(<Error show={setShow} />, overlay)
              }
            />
          </Switch>
        </div>
      </Grid>
    </>
  );
};

export default Routes;
