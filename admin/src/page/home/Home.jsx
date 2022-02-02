import React, { useState, useEffect, useMemo } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Container from "@mui/material/Container";
import api from "../../utils/api.config";
import "./Home.scss";

const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats, setuserStats] = useState([]);
  useEffect(() => {
    const getuserStats = async () => {
      try {
        const res = await api.get("users/stats");
        const statslist = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        statslist.map((item) => {
          return setuserStats((prev) => {
            return [
              ...prev,
              { name: MONTHS[item._id - 1], "New user": item.total },
            ];
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    getuserStats();
  }, [MONTHS]);

  return (
    <Container className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" datakey="New user" grid />
      <div className="homeWidget">
        <WidgetSm />

        <WidgetLg />
      </div>
    </Container>
  );
};

export default Home;
