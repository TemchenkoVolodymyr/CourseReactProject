import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import  './HamburgerMovies.module.scss';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{color:'#d57d06',cursor:'pointer'}}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Movies
      </Button>
      <Menu
        className='hamburger'
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/">Home</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/discovery">Discovery</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/fresh">Fresh movies</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/trending">Trending now</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
           <NavLink to="/popMovies">Popular Movie</NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}