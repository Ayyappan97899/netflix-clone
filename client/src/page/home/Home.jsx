import React, { useEffect, useState } from "react";
import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import api from "../../api.config";

const Home = ({ type }) => {
  const [lists, setlists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await api({
          method: "get",
          url: `/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
        });
        setlists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomList();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setgenre={setGenre} />
      {lists.map((list) => {
        return <List list={list} />;
      })}
    </div>
  );
};

export default Home;
