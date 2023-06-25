import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './BurgerMenu.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import ProfileSection from '../../../router/Navigations/ProfileSection';
import { itemGenres } from '../../../constants/data';
import { loadData } from '../../../utils/helperFunctions/loadUserDataFromFB';


const BurgerMenu = ({ items }) => {

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

    // if (id) loadData({ setUserData, id });
  }, [modal,id]);

  // const userName = userData && userData.userName;

  const itemGenres = [{
    to: '/genre/action',
    name: 'Action',
  },
    {
      to: '/genre/adventure',
      name: 'Adventure',
    },

    {
      to: '/genre/comedy',
      name: 'Comedy',
    },
    {
      to: '/genre/drama',
      name: 'Drama',
    },
    {
      to: '/genre/animation',
      name: 'Animation',
    },
    {
      to: '/genre/fantasy',
      name: 'Fantasy',
    },
    {
      to: '/genre/documentary',
      name: 'Documentary',
    },
    {
      to: '/genre/horror',
      name: 'Horror',
    },
  ];

  const changeActive = () => {
    document.body.classList.toggle('lock');
    setIsActive(!isActive);
  };
  const links = items.map((item, i) => <NavLink key={i} to={item.to}>{item.name}</NavLink>);
  const genres = itemGenres.map((item, i) => <NavLink key={i} to={item.to}>{item.name}</NavLink>);


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

export default BurgerMenu;