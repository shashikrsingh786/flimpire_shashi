/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AppBar,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';

import { DrawerPaper, IconBtn, LinkBtn, Nav, StyledToolbar } from './styles';
import { SideBar } from '..';

function Navbar() {
  const isAuthenticated = true;
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();

  return (
    <>
      <AppBar position="fixed">
        <StyledToolbar>
          {isMobile && (
          <IconBtn
            edge="start"
            onClick={() => setMobileOpen((prevState) => !prevState)}
          >
            <Menu />
          </IconBtn>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => {}}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkBtn
                color="inherit"
                component={Link}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://icons.veryicon.com/png/o/miscellaneous/administration/account-25.png"
                />
              </LinkBtn>
            )}
          </div>
          {isMobile && 'searchpp'}
        </StyledToolbar>
      </AppBar>
      <div>
        <Nav>
          {isMobile ? (
            <DrawerPaper
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </DrawerPaper>
          ) : (
            <DrawerPaper variant="permanent" open>
              <SideBar setMobileOpen={setMobileOpen} />
            </DrawerPaper>
          )}
        </Nav>
      </div>
    </>
  );
}

export default Navbar;
