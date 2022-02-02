import React, { useEffect, useState } from "react";
import stranger from "../../img/stranger.jpg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import api from "../../api.config";
import "./Featured.scss";

const Featured = ({ type, setgenre }) => {
  const [content, setcontent] = useState({});
  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const res = await api.get(`/movies/random?type=${type}`);
        setcontent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomMovie();
  }, [type]);
  return (
    <div className="featured">
      {type && (
        <div className="categories">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setgenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="stranger things" />
      <div className="info">
        <div className="description">
          <h2>{content.title}</h2>
          <p>{content.desc}</p>
        </div>
        <div className="buttons">
          <button className="playbtn">
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className="infobtn">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
