import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './MyHamburger.module.scss';
import { useAuth } from '../../hooks/useAuth';
import itemGenres from "../../constants/itemGenres";
import ProfileSection from "../../router/Navigations/ProfileSection";


const MyHamburger = ({ items }) => {

  const [modal, setModal] = useState(false);
  const [styleModal, setStyleModal] = useState();
  const [isActive, setIsActive] = useState(false);
  const { id } = useAuth();

  useEffect(() => {
    if (modal === false) {
      setStyleModal({
        // backgroundColor: '#219132',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: '1001',
        // top:-1000,
        top: 0,
      });
    } else {
      setStyleModal({
        backgroundColor: '#7c1d1d',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: '1001',

      });
    }
  }, [modal,id]);

  const changeActive = () => {
    document.body.classList.toggle('lock');
    setIsActive(!isActive);
  };
  const links = items.map((item, i) => <NavLink key={i} to={item.to}>{item.name}</NavLink>);
  const genres = itemGenres.map((item, i) => <NavLink key={i} to={item.to}>{item.name}</NavLink>)


  return (
    <div className={style.container}>
      <div className={`${style.headerBurger} ${isActive ? style.active : null}`} onClick={changeActive}>
        <span></span>
        <div className={style.menu}>
          <ul className={style.items} style={styleModal}>
            <NavLink to={'/'} >Home</NavLink>
            <p>Movies</p>
            {links}
            <p>Genres</p>
            {genres}
            <ProfileSection/>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyHamburger;