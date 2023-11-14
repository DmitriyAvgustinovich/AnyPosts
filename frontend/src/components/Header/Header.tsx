import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoIcon from "../../../public/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  headerBarWrapper,
  headerWrapper,
  headerIcons,
  headerDesktopLogoIcon,
  headerMobLogoIcon,
  headerUsername,
  headerMenuItemsBlockDesktop,
  headerMenuItemsBlockMob,
  headerDesktopMenuItem,
  headerMobMenuItem,
  headerMenuItemBlock,
  headerActiveLink,
} from "./HeaderStylesMui";
import { navLink } from "../../globalsStylesMui";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setLogout } from "../../redux/slices/authSlice";
import { useGetUser } from "../../hooks/useGetUser";
import { useSetAuthUser } from "../../hooks/useSetAuthUser";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  return (
    <AppBar position="static" sx={headerBarWrapper}>
      <Container maxWidth={false} sx={headerWrapper}>
        <Toolbar>
          <CardMedia
            sx={headerDesktopLogoIcon}
            component="img"
            src={LogoIcon}
            alt=""
            onClick={() => navigate("/")}
          />

          <Box sx={headerMenuItemsBlockMob}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon sx={headerIcons} />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => setAnchorElNav(null)}>
                  <Box sx={headerMenuItemBlock} key={page.label}>
                    <Link
                      onClick={() => navigate(page.link)}
                      sx={[
                        headerMobMenuItem,
                        navLink,
                        location.pathname === page.link ? headerActiveLink : {},
                      ]}
                    >
                      {page.label}
                    </Link>
                  </Box>
                </MenuItem>
              ))}
            </Menu>

            <CardMedia
              sx={headerMobLogoIcon}
              component="img"
              src={LogoIcon}
              alt=""
            />
          </Box>

          <Box sx={headerMenuItemsBlockDesktop}>
            {pages.map((page) => (
              <Box sx={headerMenuItemBlock} key={page.label}>
                <Link
                  onClick={() => navigate(page.link)}
                  sx={[
                    headerDesktopMenuItem,
                    navLink,
                    location.pathname === page.link ? headerActiveLink : {},
                  ]}
                >
                  {page.label}
                </Link>
              </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(e) => setAnchorElUser(e.currentTarget)}
                sx={{ p: 0 }}
              >
                <Avatar alt="Avatar" src="" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem>
                <Box sx={headerMenuItemBlock}>
                  <Typography sx={[headerUsername, navLink]}>
                    {isAuth ? user.username : "User Name"}
                  </Typography>
                </Box>
              </MenuItem>

              <MenuItem onClick={() => setAnchorElUser(null)}>
                <Box sx={headerMenuItemBlock}>
                  <Link
                    onClick={() => navigate("/dashboard/statistics")}
                    sx={[
                      headerDesktopMenuItem,
                      navLink,
                      location.pathname === "/dashboard/statistics"
                        ? headerActiveLink
                        : {},
                    ]}
                  >
                    Dashboard
                  </Link>
                </Box>
              </MenuItem>

              <MenuItem onClick={() => setAnchorElUser(null)}>
                <Box sx={headerMenuItemBlock}>
                  {isAuth ? (
                    <Link
                      onClick={() => dispatch(setLogout())}
                      sx={[headerDesktopMenuItem, navLink]}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link
                      onClick={() => navigate("/login")}
                      sx={[
                        headerDesktopMenuItem,
                        navLink,
                        location.pathname === "/login" ? headerActiveLink : {},
                      ]}
                    >
                      Login
                    </Link>
                  )}
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
