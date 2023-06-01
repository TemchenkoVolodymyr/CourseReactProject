import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {iconTypes} from "../constants/constantsIcons";
import {Icon} from "../Components/Icon/Icon";
import {useDispatch} from "react-redux";
import {removeUser} from "../redux/store/user/userSlice";
import {useAuth} from "../hooks/useAuth";
import styles from './Navigations.module.scss'

const Navigations = () => {

  const dispatch = useDispatch()
  const {isAuth} = useAuth()

  const [login, setLogin] = useState(false);

  // const isLogin = ({isActive}) => {
  //   if (isActive) {
  //     setLogin(true);
  //     return "active";
  //   }
  //   setLogin(false);
  //   return "";
  // }

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
      <NavLink to='/comedy'><Icon type={iconTypes.happy2}/>Comedy</NavLink>
      <NavLink to='/cartoons'><Icon type={iconTypes.manWomen}/>Cartoons</NavLink>
      <NavLink to='/fantasy'><Icon type={iconTypes.magicWand}/>Fantasy</NavLink>
      <NavLink to='/biography'><Icon type={iconTypes.hipster2}/>Biography</NavLink>
      <p>general</p>
      {isAuth
        ? <Link
          to='/auth'
          onClick={() => dispatch(removeUser())}
          className='active'
          ><Icon type={iconTypes.exit}/>Logout</Link> :
        <NavLink
          to='/auth'
          ><Icon type={iconTypes.enter}/>Login</NavLink>
      }

    </>
  );
};

export default Navigations;