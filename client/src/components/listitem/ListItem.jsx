import React, { useState, useEffect } from "react";
import "./ListItem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { Link } from "react-router-dom";

const ListItem = ({ index, item }) => {
  const [hovered, sethovered] = useState(false);

  return (
    <div
      className="list-item"
      style={{ left: hovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => {
        sethovered(true);
      }}
      onMouseLeave={() => sethovered(false)}
    >
      <img src={item?.imgsm} alt="Stranger Things" />

      {hovered && (
        <>
          <video autoPlay={true} controls loop poster={item?.imgsm}>
            <source src="" type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
          <div className="itemInfo">
            <div className="icons">
              <Link to="/watch" state={item} className="link">
                <PlayArrowIcon className="icon" />
              </Link>

              <AddIcon className="icon" />
              <ThumbUpAltOutlinedIcon className="icon" />
              <ThumbDownAltOutlinedIcon className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{item?.duration}</span>
              <span className="limit">{item?.limit}</span>
              <span>{item?.year}</span>
            </div>
            <div className="description">{item?.desc}</div>
            <div className="genre">{item?.genre}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
