import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./FeaturedInfo.scss";

const FeaturedInfo = () => {
  return (
    <div className="featured">
      <Card className="featuredItem left">
        <CardContent>
          <span className="featuredTitle">Revanue</span>
          <div className="container">
            <span className="money">$2,415</span>
            <span className="moneyRate">
              -11.5 <ArrowDownwardIcon className="icon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </CardContent>
      </Card>

      <Card className="featuredItem center">
        <CardContent>
          <span className="featuredTitle">Sales</span>
          <div className="container">
            <span className="money">$4,415</span>
            <span className="moneyRate">
              -3.5 <ArrowDownwardIcon className="icon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </CardContent>
      </Card>

      <Card className="featuredItem right">
        <CardContent>
          <span className="featuredTitle">Cost</span>
          <div className="container">
            <span className="money">$5,415</span>
            <span className="moneyRate">
              +2.5 <ArrowUpwardIcon className="icon" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedInfo;
