import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, Link } from "react-router-dom";
import "./Watch.scss";

const Watch = () => {
  const location = useLocation();
  const movie = location.state;
  console.log(movie);
  return (
    <div className="watch">
      <Link to="/" className="link">
        <div className="back">
          <ArrowBackIcon />
          Home
        </div>
      </Link>
      <video
        className="video"
        src={movie.video}
        autoPlay
        controls
        progress="true"
      ></video>
    </div>
  );
};

export default Watch;
