import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import {useDispatch, useSelector} from 'react-redux';
import {setIsAuth, setUser} from "../../redux/backend/userBackendSlice";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const {isAuth, user} = useSelector(state => state.userBackend)

  const logOut = () => {
    dispatch(setUser({}))
    dispatch(setIsAuth(false))
  }

  return (
    <>
      <p>Profile</p>
      {
        isAuth ?
          <>
            <NavLink
              to="/login"
              onClick={() => logOut()}
              className={'active'}
              style={{ cursor: 'pointer' }}
            ><BiLogOut size={25}/>Logout</NavLink>
            <NavLink
              to={`/u/${user.id}`}
              style={{ cursor: 'pointer' }}
            ><CgProfile size={25} color={'#E30914'}/>View Profile</NavLink>
          </>
          :
          <NavLink
            to={'/login'}
            className={'active'}
            style={{ cursor: 'pointer' }}
          ><BiLogIn size={25}/>Login</NavLink>
      }

    </>
  );
};

export default ProfileSection;