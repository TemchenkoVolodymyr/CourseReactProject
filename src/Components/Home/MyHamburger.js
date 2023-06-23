import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './MyHamburger.module.scss';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../../hooks/useAuth';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { getAuth, signOut } from 'firebase/auth';
import { removeUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';


const MyHamburger = (props) => {

  const { title, items } = props;
  const [modal, setModal] = useState(false);
  const [styleModal, setStyleModal] = useState();

  const [isActive, setIsActive] = useState(false);
  const { isAuth, isAdmin } = useAuth();
  const dispatch = useDispatch();

  const openModal = () => {
    setModal(!modal);
  };

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
  }, [modal]);

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
  const links = items.map((item) => <NavLink to={item.to}>{item.name}</NavLink>);
  const genres = itemGenres.map((item) => <NavLink to={item.to}>{item.name}</NavLink>)

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {

      dispatch(removeUser());
    }).catch((error) => error
    );
  };


    return (
    <div className={style.container}>
      {/*<p className={style.openModal} onClick={openModal}>{title}</p>*/}
      <div className={`${style.headerBurger} ${isActive ? style.active : null}`} onClick={changeActive}>
        <span></span>
        <div className={style.menu}>
          <ul className={style.items} style={styleModal}>
            <NavLink to={'/'} >Home</NavLink>
            <p>Movies</p>
            {links}
           <p>Genres</p>
            {genres}
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
                to={'/u/'}
                style={{ cursor: 'pointer' }}
              ><CgProfile size={25} color={'#E30914'}/>View Profile</NavLink>

              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyHamburger;