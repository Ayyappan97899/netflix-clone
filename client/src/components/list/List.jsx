import React, { useRef, useState, useEffect } from "react";
import ListItem from "../listitem/ListItem";
import "./List.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import api from "../../api.config";

const Lists = ({ list }) => {
  const listRef = useRef();
  const [ismoved, setmoved] = useState(false);
  const [slider, setslider] = useState(0);
  const [content, setcontent] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await api.post("/movies/list", list.content);
        setcontent(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [list]);

  const handleclick = (direction) => {
    setmoved(true);
    const distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slider > 0) {
      setslider(slider - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slider < 5) {
      setslider(slider + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosIcon
          className="sliderArrow left"
          onClick={() => handleclick("left")}
          style={{ display: !ismoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {content.map((item, index) => {
            return <ListItem index={index} item={item} />;
          })}
        </div>
        <ArrowForwardIosIcon
          className="sliderArrow right"
          onClick={() => handleclick("right")}
        />
      </div>
    </div>
  );
};

export default Lists;
