import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { getAuth, signOut } from 'firebase/auth';
import { removeUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { loadData } from '../../utils/helperFunctions/loadUserDataFromFB';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const { isAuth, isAdmin } = useAuth();
  const { id } = useAuth();
  const [ userData, setUserData] = useState(null);

  const userName = userData && userData.userName;

  useEffect(() => {
    if (id) loadData({ setUserData, id });
  }, [id]);


  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(removeUser());
      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isAuth);
  return (
    <>
      <p>Profile</p>
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
      {isAuth ?
        <NavLink
          to={`/u/${userName}`}
          style={{ cursor: 'pointer' }}
        ><CgProfile size={25} color={'#E30914'}/>View Profile</NavLink>

        : null}
    </>
  );
};

export default ProfileSection;