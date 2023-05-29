import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {iconTypes} from "../constants/constantsIcons";
import {Icon} from "../Components/Icon/Icon";

const Navigations = () => {

  const [active, setActive] = useState(false);
  const [login, setLogin] = useState(false);

  const isPush = ({isActive}) => {
    if (isActive) {
      setActive(true);
      return "active";
    }
    setActive(false);
    return "";
  }

  const isLogin = ({isActive}) => {
    if (isActive) {
      setLogin(true);
      return "active";
    }
    setLogin(false);
    return "";
  }

  return (
    <>
      <NavLink to="/"><Icon type={iconTypes.film} size={"30px"} color={"#E30914"}/><h1>MovieMagic.UA</h1></NavLink>
      <p>menu</p>
      <NavLink className={isPush} to="/"> <Icon type={iconTypes.home} size={"20px"}
                                                color={active ? "#E30914" : "grey"}/>Home</NavLink>
      <NavLink to='/discovery'><Icon type={iconTypes.compass} size={"20px"} color={"grey"}/>Discovery</NavLink>
      <NavLink to='/fresh'><Icon type={iconTypes.spinner} size={"20px"} color={"grey"}/>Fresh movies</NavLink>
      <NavLink to='/trending'><Icon type={iconTypes.fire} size={"20px"} color={"grey"}/>Trending now</NavLink>
      <p>popular genders</p>
      <NavLink to='/comedy'><Icon type={iconTypes.happy2} size={"20px"} color={"grey"}/>Comedy</NavLink>
      <NavLink to='/cartoons'><Icon type={iconTypes.manWomen} size={"20px"} color={"grey"}/>Cartoons</NavLink>
      <NavLink to='/fantasy'><Icon type={iconTypes.magicWand} size={"20px"} color={"grey"}/>Fantasy</NavLink>
      <NavLink to='/biography'><Icon type={iconTypes.hipster2} size={"20px"} color={"grey"}/>Biography</NavLink>
      <p>general</p>
      {login ? <NavLink className={isLogin} to='/auth'><Icon type={iconTypes.exit} size={"20px"} color={"grey"}/>Logout</NavLink> :
        <NavLink to='/auth'><Icon type={iconTypes.enter} size={"20px"} color={"grey"}/>Login</NavLink>
      }
    </>
  );
};

export default Navigations;