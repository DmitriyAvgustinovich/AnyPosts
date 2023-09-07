import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography, Menu, MenuItem, Link, CardMedia } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LogoIcon from '../../../public/reverseLogo.png';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GridViewIcon from '@mui/icons-material/GridView';
import CreateIcon from '@mui/icons-material/Create';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, setLogout } from '../../redux/slices/authSlice';
import { useGetUser } from '../../hooks/useGetUser';
import { useSetAuthUser } from '../../hooks/useSetAuthUser';
import {
  dashboardWrapper,
  dashboardSidebar,
  dashboardLogoIcon,
  dashboardPagesBlock,
  dashboardPagesItem,
  dashboardPagesIcon,
  dashboardMenuWrapper,
  dashboardIcons,
  dashboardMenuItemBlock,
  dashboardUsername,
  dashBoardPageContent,
} from './DashboardStylesMui';
import { navLink, primaryText } from '../../globalsStylesMui';
import { IDashboard } from '../../interfaces/IDashboard';

export const Dashboard: React.FC<IDashboard> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector(selectAuth);
  const user = useGetUser();
  useSetAuthUser(user);

  console.log(user);

  const dashboardPages = [
    {
      label: 'Dashboard',
      link: '/dashboard/statistics',
      icon: <GridViewIcon sx={dashboardPagesIcon} />,
    },
    {
      label: 'Write a Post',
      link: '/dashboard/addPost',
      icon: <CreateIcon sx={dashboardPagesIcon} />,
    },
    {
      label: 'All Posts',
      link: '/dashboard/posts',
      icon: <ImportContactsIcon sx={dashboardPagesIcon} />,
    },
  ];

  const pages = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'Tags',
      link: '/tags',
    },
    {
      label: 'About',
      link: '/about',
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
  };

  return (
    <Box sx={dashboardWrapper}>
      <Box sx={dashboardSidebar}>
        <CardMedia sx={dashboardLogoIcon} component='img' src={LogoIcon} alt='' onClick={() => navigate('/')} />

        <Box sx={dashboardPagesBlock}>
          {dashboardPages.map((page, index) => (
            <Box sx={dashboardPagesItem} key={index}>
              {page.icon}
              <Link
                sx={[primaryText, { color: 'var(--white)' }]}
                onClick={() => navigate(page.link)}
              >
                {page.label}</Link>
            </Box>
          ))}
        </Box>
      </Box>

      <AppBar position='static' sx={dashboardMenuWrapper}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={(e) => setMenuAnchorEl(e.currentTarget)}
          >
            <MenuIcon sx={dashboardIcons} />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }} />
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={(e) => setAnchorEl(e.currentTarget)}
              color='inherit'
            >
              <AccountCircle sx={[dashboardIcons, { color: 'var(--gray)' }]} />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >

              <MenuItem>
                <Box sx={dashboardMenuItemBlock}
                >
                  <Typography sx={[dashboardUsername, navLink]}>{isAuth ? user.username : 'User Name'}</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Box sx={dashboardMenuItemBlock}
                >
                  {isAuth
                    ? <Link onClick={() => dispatch(setLogout())} sx={navLink}>Logout</Link>
                    : <Link onClick={() => navigate('/login')} sx={navLink}>Login</Link>
                  }
                </Box>
              </MenuItem>
            </Menu>
          </div>
          <Menu
            id='menu-burger'
            anchorEl={menuAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(menuAnchorEl)}
            onClose={handleClose}
          >
            {pages.map((page) => (
              <MenuItem key={page.label} onClick={handleClose}>
                <Box sx={dashboardMenuItemBlock} key={page.label}>
                  <Link onClick={() => navigate(page.link)} sx={navLink}>{page.label}</Link>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>

        <Box sx={dashBoardPageContent}>{children}</Box>
      </AppBar>
    </Box>
  );
};
