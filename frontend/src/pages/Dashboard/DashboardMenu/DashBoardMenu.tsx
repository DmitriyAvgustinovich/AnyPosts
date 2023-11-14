import React from "react";
import { Box, SwipeableDrawer, CardMedia, Link, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StyleIcon from "@mui/icons-material/Style";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import {
  dashboardMenuSidebar,
  dashboardMenuBurgerIcon,
  dashboardMenuLogoIcon,
  dashboardMenuDivider,
  dashboardMenuActiveLink,
  dashboardMenuPagesItem,
  dashboardMenuPagesIcon,
} from "./DashBoardMenuStyleMui";
import { dashboardIcons } from "../DashboardStylesMui";
import { useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "../../../../public/reverseLogo.png";
import { primaryText } from "../../../globalsStylesMui";

type Anchor = "left";

export const DashBoardMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpenFilters, setIsOpenFilters] = React.useState({ left: true });

  const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
    setIsOpenFilters({ ...isOpenFilters, [anchor]: open });
  };

  const appPages = [
    {
      label: "Home",
      link: "/",
      icon: <HomeIcon sx={dashboardMenuPagesIcon} />,
    },
    {
      label: "Tags",
      link: "/tags",
      icon: <StyleIcon sx={dashboardMenuPagesIcon} />,
    },
    {
      label: "About",
      link: "/about",
      icon: <InfoIcon sx={dashboardMenuPagesIcon} />,
    },
  ];

  const dashboardPages = [
    {
      label: "Profile",
      link: "/dashboard/profile",
      icon: <PersonIcon sx={dashboardMenuPagesIcon} />,
    },
    {
      label: "Write a Post",
      link: "/dashboard/addPost",
      icon: <CreateIcon sx={dashboardMenuPagesIcon} />,
    },
    {
      label: "Statistics",
      link: "/dashboard/statistics",
      icon: <LeaderboardIcon sx={dashboardMenuPagesIcon} />,
    },
  ];

  const list = (anchor: Anchor) => (
    <Box sx={{ width: anchor === "left" ? "auto" : 250 }}>
      <Box sx={dashboardMenuSidebar}>
        <MenuIcon
          sx={dashboardMenuBurgerIcon}
          onClick={toggleDrawer(anchor, false)}
        />
        <CardMedia
          sx={dashboardMenuLogoIcon}
          component="img"
          src={LogoIcon}
          alt=""
          onClick={() => navigate("/")}
        />

        {appPages.map((page, index) => (
          <Box
            sx={[
              dashboardMenuPagesItem,
              location.pathname === page.link ? dashboardMenuActiveLink : {},
            ]}
            key={index}
          >
            {page.icon}
            <Link
              sx={[primaryText, { color: "var(--white)" }]}
              onClick={() => navigate(page.link)}
            >
              {page.label}
            </Link>
          </Box>
        ))}

        <Divider sx={dashboardMenuDivider} />

        {dashboardPages.map((page, index) => (
          <Box
            sx={[
              dashboardMenuPagesItem,
              location.pathname === page.link ? dashboardMenuActiveLink : {},
            ]}
            key={index}
          >
            {page.icon}
            <Link
              sx={[primaryText, { color: "var(--white)" }]}
              onClick={() => navigate(page.link)}
            >
              {page.label}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon sx={dashboardIcons} onClick={toggleDrawer(anchor, true)}>
            {anchor}
          </MenuIcon>
          <SwipeableDrawer
            anchor={anchor}
            open={isOpenFilters[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            BackdropProps={{ invisible: true }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};
