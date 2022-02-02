import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PlayCircleOutline from "@mui/icons-material/PlayCircleOutline";
import ReportIcon from "@mui/icons-material/Report";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./SideBar.scss";

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const matches = useMediaQuery("(max-width: 900px)");

  const handleListItemClick = (event, index) => {
    sessionStorage.setItem("key", index);
    setSelectedIndex(index);
  };

  useEffect(() => {
    let selectIndex = +sessionStorage.getItem("key");
    setSelectedIndex(selectIndex);
  }, [matches]);

  return (
    <div className="sidebarlist">
      <div className="sidebarmenu">
        <Typography variant="h3" className="dashtitle">
          Dashboard
        </Typography>
        <List
          component="nav"
          aria-label="main mailbox folders"
          className="list"
        >
          <Link to="/" className="Link">
            <Tooltip title={matches ? "Home" : ""} placement="right">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                className="listItem"
              >
                <ListItemIcon className="listIcon">
                  <LineStyleIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Home" className="listText" />
              </ListItemButton>
            </Tooltip>
          </Link>
          <Tooltip title={matches ? "Analytics" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              className="listItem"
            >
              <ListItemIcon className="listIcon">
                <TimelineIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Analytics" className="listText" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title={matches ? "Sales" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
              className="listItem"
            >
              <ListItemIcon className="listIcon">
                <TrendingUpIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Sales" className="listText" />
            </ListItemButton>
          </Tooltip>
        </List>
      </div>

      {/* 2-menu */}

      <div className="sidebarmenu">
        <Typography variant="h3" className="title">
          Quick Menu
        </Typography>
        <List
          component="nav"
          aria-label="main mailbox folders"
          className="list"
        >
          <Link to="/users" className="Link">
            <Tooltip title={matches ? "Users" : ""} placement="right">
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
                className="listItem"
              >
                <ListItemIcon className="listIcon">
                  <PersonOutlineIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Users" className="listText" />
              </ListItemButton>
            </Tooltip>
          </Link>

          <Link to="/movies" className="Link">
            <Tooltip title={matches ? "Movies" : ""} placement="right">
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
                className="listItem"
              >
                <ListItemIcon className="listIcon">
                  <PlayCircleOutline className="icon" />
                </ListItemIcon>
                <ListItemText primary="Movies" className="listText" />
              </ListItemButton>
            </Tooltip>
          </Link>
          <Link to="/lists" className="Link">
            <Tooltip title={matches ? "Lists" : ""} placement="right">
              <ListItemButton
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
                className="listItem"
              >
                <ListItemIcon className="listIcon">
                  <ListIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Lists" className="listText" />
              </ListItemButton>
            </Tooltip>
          </Link>
          <Tooltip title={matches ? "Reports" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
              className="listItem"
            >
              <ListItemIcon className="listIcon">
                <BarChartIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Reports" className="listText" />
            </ListItemButton>
          </Tooltip>
        </List>
      </div>

      {/* 3-menu */}

      <div className="sidebarmenu">
        <Typography variant="h3" className="title">
          Notifications
        </Typography>
        <List
          component="nav"
          aria-label="main mailbox folders"
          className="list"
        >
          <Tooltip title={matches ? "Mail" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 7}
              onClick={(event) => handleListItemClick(event, 7)}
              className="listItem"
            >
              <ListItemIcon className="listIcon">
                <MailOutlineIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Mail" className="listText" />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={matches ? "Feedback" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 8}
              onClick={(event) => handleListItemClick(event, 8)}
              className="listItem"
            >
              <ListItemIcon className="listIcon">
                <DynamicFeedIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Feedback" className="listText" />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={matches ? "Messages" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 9}
              onClick={(event) => handleListItemClick(event, 9)}
              className="listItem"
            >
              <ListItemIcon className="listIcon">
                <ChatBubbleOutlineIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Messages" className="listText" />
            </ListItemButton>
          </Tooltip>
        </List>
      </div>

      {/* 4-menu */}

      <div className="sidebarmenu">
        <Typography variant="h3" className="title">
          Staff
        </Typography>
        <List
          component="nav"
          aria-label="main mailbox folders"
          className="list"
        >
          <Tooltip title={matches ? "Manage" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 10}
              onClick={(event) => handleListItemClick(event, 10)}
              className="listItem"
            >
              <ListItemIcon className="listIcon">
                <WorkOutlineIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Manage" className="listText" />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={matches ? "Analytics" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 11}
              onClick={(event) => handleListItemClick(event, 11)}
              className="listItem"
            >
              <ListItemIcon className="listIcon">
                <TimelineIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Analytics" className="listText" />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={matches ? "Reports" : ""} placement="right">
            <ListItemButton
              selected={selectedIndex === 12}
              onClick={(event) => handleListItemClick(event, 12)}
              className="listItem last"
            >
              <ListItemIcon className="listIcon">
                <ReportIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Reports" className="listText" />
            </ListItemButton>
          </Tooltip>
        </List>
      </div>
    </div>
  );
};

export default SideBar;
