import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

export default function HamburgerGenres() {
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
        style={{color:'#ff0000',cursor:'pointer'}}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Genres
      </Button>
      <Menu
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
          <NavLink to="/genre/action">Action</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/genre/adventure">Adventure</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/genre/comedy">Comedy</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/genre/drama">Drama</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/genre/animation">Animation</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/genre/fantasy">Fantasy</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>

          <NavLink to="/genre/horror">Horror</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/genre/documentary">Documentary</NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}