import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import "./TopBar.scss";
import { useHistory } from "react-router-dom";

const TopBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const History = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    History.replace("/login");
    sessionStorage.removeItem("key");
  };

  return (
    <div className="topbar">
      <div className="wrapper">
        <div className="leftbar">
          <span className="logo">Admin</span>
        </div>
        <div className="rightbar">
          <Badge badgeContent={4} color="error" className="icon">
            <NotificationsNoneIcon />
          </Badge>
          <Badge badgeContent={4} color="error" className="icon">
            <LanguageIcon />
          </Badge>

          <div className="setting">
            <SettingsIcon className="icon" />
            <div className="option" onClick={logoutHandler}>
              <span>Logout</span>
            </div>
          </div>
          <Avatar
            src={user?.profile || "https://i.stack.imgur.com/34AD2.jpg"}
            alt="Travis Howard"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
