import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { text: 'Home', path: '/' },
  // { text: 'Details', path: '/details' },
  { text: 'Generate', path: '/generate' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <>
      <AppBar position="static" className=" shadow-md z-50 flex  ">
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h6" className="text-white font-bold">
          <b>Employe Admin
            </b>  
          </Typography>

          {/* Desktop links - Fixed Web View */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`font-medium transition duration-300 ${ location.pathname === link.path
                  ? 'text-gray-400'
                  : 'text-white hover:text-gray-300'
                  }`}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <IconButton edge="end" onClick={toggleDrawer(true)} aria-label="menu">
              <MenuIcon className="text-black" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer - Keeping existing good implementation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="w-64 pt-4 relative">
          {/* Close Button */}
          <IconButton
            onClick={toggleDrawer(false)}
            className="absolute top-2 left-2"
            aria-label="close"
          >
            <CloseIcon className="text-black" />
          </IconButton>

          {/* Navigation Links */}
          <List className="mt-10">
            {navLinks.map((link) => (
              <ListItem key={link.text}  onClick={toggleDrawer(false)}>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  selected={location.pathname === link.path}
                  onClick={() => handleLinkClick(link.path)}
                >
                  <ListItemText
                    primary={link.text}
                    primaryTypographyProps={{
                      color: location.pathname === link.path ? 'primary' : 'inherit'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}