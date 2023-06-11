import React from 'react';
import {NavLink} from "react-router-dom";
import {iconTypes} from "../constants/constantsIcons";
import {Icon} from "../Components/Icon/Icon";
import {useDispatch} from "react-redux";
import {removeUser} from "../redux/slices/userSlice";
import {useAuth} from "../hooks/useAuth";
import styles from './Navigations.module.scss'
import {getAuth, signOut} from "firebase/auth";
import {GiDramaMasks, GiGhost, GiPistolGun} from "react-icons/gi";
import {SiOpenstreetmap} from "react-icons/si";



const Navigations = () => {

  const dispatch = useDispatch()
  const {isAuth, isAdmin} = useAuth()

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser());
    }).catch((error) => {
      // An error happened.
      console.error(error);
    });
  };

  return (
    <>
      <NavLink to="/"><Icon type={iconTypes.film} size={"30px"} color={"#E30914"}/>
        <h1>MovieMagic<span>.</span>UA</h1>
      </NavLink>
      <p>menu</p>
      <NavLink to="/"> <Icon type={iconTypes.home}/>Home</NavLink>
      <NavLink to='/discovery'><Icon type={iconTypes.compass}/>Discovery</NavLink>
      <NavLink to='/fresh'><Icon type={iconTypes.spinner}/>Fresh movies</NavLink>
      <NavLink to='/trending'><Icon type={iconTypes.fire}/>Trending now</NavLink>
      <p>popular genders</p>
      <NavLink to='/action'><GiPistolGun/>Action</NavLink>
      <NavLink to='/adventure'><SiOpenstreetmap/>Adventure</NavLink>
      <NavLink to='/comedy'><Icon type={iconTypes.happy2}/>Comedy</NavLink>
      <NavLink to='/drama'><GiDramaMasks/>Drama</NavLink>
      <NavLink to='/animation'><Icon type={iconTypes.manWomen}/>Animation</NavLink>
      <NavLink to='/fantasy'><Icon type={iconTypes.magicWand}/>Fantasy</NavLink>
      <NavLink to='/documentary'><Icon type={iconTypes.hipster2}/>Documentary</NavLink>
      <NavLink to='/horror'><GiGhost/>Horror</NavLink>

      <p>general</p>
      {
        isAuth ?
          <NavLink
            to='/auth'
            onClick={logout}
            className={styles.activeLink}
          ><Icon type={iconTypes.exit}/>Logout</NavLink>
          :
          <NavLink
            to='/auth'
            className={styles.activeLink}
          ><Icon type={iconTypes.enter}/>Login</NavLink>
      }
      { <NavLink to={'/adminPanel'}>Admin Panel</NavLink> }

    </>
  );
};

export default Navigations;