import React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, Typography, Menu, MenuItem, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setLogout } from "../../redux/slices/authSlice";
import { useGetUser } from "../../hooks/useGetUser";
import { useSetAuthUser } from "../../hooks/useSetAuthUser";
import {
  dashboardMenuWrapper,
  dashboardIcons,
  dashboardMenuItemBlock,
  dashboardUsername,
  dashBoardPageContent,
} from "./DashboardStylesMui";
import { navLink } from "../../globalsStylesMui";
import { IDashboard } from "../../interfaces/IDashboard";
import { DashBoardMenu } from "./DashboardMenu/DashBoardMenu";

export const Dashboard: React.FC<IDashboard> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector(selectAuth);
  const user = useGetUser();
  useSetAuthUser(user);

  const pages = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Tags",
      link: "/tags",
    },
    {
      label: "About",
      link: "/about",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={dashboardMenuWrapper}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <DashBoardMenu />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }} />
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            color="inherit"
          >
            <AccountCircle sx={[dashboardIcons, { color: "var(--gray)" }]} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Box sx={dashboardMenuItemBlock}>
                <Typography sx={[dashboardUsername, navLink]}>
                  {isAuth ? user.username : "User Name"}
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box sx={dashboardMenuItemBlock}>
                {isAuth ? (
                  <Link onClick={() => dispatch(setLogout())} sx={navLink}>
                    Logout
                  </Link>
                ) : (
                  <Link onClick={() => navigate("/login")} sx={navLink}>
                    Login
                  </Link>
                )}
              </Box>
            </MenuItem>
          </Menu>
        </div>
        <Menu
          id="menu-burger"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(menuAnchorEl)}
          onClose={handleClose}
        >
          {pages.map((page) => (
            <MenuItem key={page.label} onClick={handleClose}>
              <Box sx={dashboardMenuItemBlock} key={page.label}>
                <Link onClick={() => navigate(page.link)} sx={navLink}>
                  {page.label}
                </Link>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>

      <Box sx={dashBoardPageContent}>{children}</Box>
    </AppBar>
  );
};
