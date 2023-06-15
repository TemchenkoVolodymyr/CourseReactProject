import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';
import { getAuth, signOut } from 'firebase/auth';
import Navigations from './Navigations';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';


const SectionNavigation = () => {

  const dispatch = useDispatch();
  const { isAuth, isAdmin } = useAuth();

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {

      dispatch(removeUser());
    }).catch((error) => error
    );
  };

  return (
    <>
      <Navigations isAuth={isAuth} isAdmin={isAdmin}></Navigations>
      <p>general</p>
      {
        isAuth ?
          <NavLink
            to="/auth"
            onClick={logout}
            className={'active'}
            style={{ cursor: 'pointer' }}
          ><BiLogOut size={25}/>Logout</NavLink>
          :
          <NavLink
            to="/auth"
            className={'active'}
            style={{ cursor: 'pointer' }}
          ><BiLogIn size={25}/>Login</NavLink>
      }
      {isAuth && isAdmin ? <NavLink to={'/adminPanel'}>Admin Panel</NavLink> : null}
      {isAuth ?
        <NavLink
          to={'/u/'}
          style={{ cursor: 'pointer' }}
        ><CgProfile size={25} color={'#E30914'}/>View Profile</NavLink>

        : null}

    </>
  );
};

export default SectionNavigation;