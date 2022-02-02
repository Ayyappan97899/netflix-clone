import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/home/Home";
import Watch from "./page/watch/Watch";
import Register from "./page/register/Register";
import Login from "./page/login/Login";

const App = () => {
  const user = () => {
    return JSON.parse(localStorage.getItem("login"));
  };

  console.log(user());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user() ? <Home /> : <Navigate replace to="/register" />}
        />
        <Route
          path="/register"
          element={user() ? <Navigate replace to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={user() ? <Navigate replace to="/" /> : <Login />}
        />
        {user && (
          <>
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/movies" element={<Home type="movies" />} />
            <Route path="/watch" element={<Watch />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
