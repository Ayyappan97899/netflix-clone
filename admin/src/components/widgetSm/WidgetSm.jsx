import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import api from "../../utils/api.config";
import "./WidgetSm.scss";

const WidgetSm = () => {
  const [user, setuser] = useState([]);
  useEffect(() => {
    const getNewUser = async () => {
      try {
        const res = await api.get("users?new=true");
        setuser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUser();
  }, []);
  return (
    <Card className="widgetsm">
      <CardContent>
        <span className="widgetTitle">New Join Members</span>
        <ul className="widgetlist">
          {user.map((user, index) => {
            return (
              <li className="widgetitem" key={index}>
                <div className="profileitem">
                  <img
                    src={user.profile || "https://i.stack.imgur.com/34AD2.jpg"}
                    alt="profile"
                  />
                  <div className="userDetails">
                    <span className="userName">{user.username}</span>
                  </div>
                </div>
                <button className="widgetsmBtn">
                  <VisibilityIcon className="icon" />
                  Display
                </button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WidgetSm;
