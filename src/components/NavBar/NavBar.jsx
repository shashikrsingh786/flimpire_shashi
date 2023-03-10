/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Sidebar, Search } from '..';
import useStyles from './styles';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { setUser, userSelector } from '../../features/authUser';
import { ColorModeContext } from '../../utils/ToggleColorMode';

function Navbar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)'); // if width > 600px => isMobile == false
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem('request_token');
  const dispatch = useDispatch();
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        try {
          const sessionId = localStorage.getItem('session_id') ? localStorage.getItem('session_id') : await createSessionId();

          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        } catch (error) {
          console.log('Your user data could not be fetched.');
        }
      }
    };
    logInUser();
  }, [token]);

  const { isAuthenticated, user } = useSelector(userSelector); // notice: <=> useSelector((state) => state.currentUser)

  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            > { /* an element */ }
              <Menu /> { /* an icon */ }
            </IconButton>
          )}
          { /* dark mode toggle button */ }
          <IconButton
            color="inherit"
            sx={{ ml: 1 }} // mui inline style; ml == margin left
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search /> }
          <div>
            {!isAuthenticated ? ( // login button is visible only if we are not logged in
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link} // link to a specific page
                to={`/profile/${user.id}`}
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={user?.avatar?.tmdb?.avatar_path
                    ? `https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`
                    : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                /> { /* <Avatar> is a styled image */ }
              </Button>
            )}
          </div>
          {isMobile && <Search /> }
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}> { /* HTML5 div with navigation abilities */ }
          {isMobile ? (
            <Drawer
              variant="temporary" // toggleable
              anchor="right"
              open={mobileOpen} // by default mobileOpen == false
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }} // a way to override the underlying styles of the mui component
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} /> { /* a new component */ }
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} /> { /* a new component */ }
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
