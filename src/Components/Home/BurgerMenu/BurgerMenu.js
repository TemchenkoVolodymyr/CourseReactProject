import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import style from './BurgerMenu.module.scss';
import {itemGenres, itemMovies} from '../../../constants/data';
import {CgProfile} from 'react-icons/cg';
import {BiLogIn, BiLogOut} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';
import {setIsAuth, setUser} from '../../../redux/backend/userBackendSlice';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';


const BurgerMenu = () => {

  const [isActive, setIsActive] = useState(false);
  const {isAuth, user} = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isMoviesOpen, setIsMoviesOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  const logOut = () => {
    dispatch(setUser({}));
    dispatch(setIsAuth(false));
    localStorage.removeItem('token');
  };

  const changeActive = () => {
    document.body.classList.toggle('lock');
    setIsActive(!isActive);
  };

  const onClickMovieHandler = (event) => {
    event.stopPropagation();
    setIsMoviesOpen(!isMoviesOpen);
  };

  const onClickGenreHandler = (event) => {
    event.stopPropagation();
    setIsGenreOpen(!isGenreOpen);
  };

  const links = itemMovies.map((item, i) => <NavLink key={i} to={item.to}>{item.name}</NavLink>);
  const genres = itemGenres.map((item, i) => <NavLink key={i} to={item.to}>{item.name}</NavLink>);

  return (
    <div className={style.container}>
      <div className={`${style.headerBurger} ${isActive ? style.active : null}`} onClick={changeActive}>
        <span></span>
        <div className={style.menu}>
          <div className={style.userInfo}>
            {isAuth ?
              <div className={style.login}>
                <NavLink
                  to={`/u/${user.userName}`}
                  style={{cursor: 'pointer'}}
                ><CgProfile size={35} color={'#E30914'}/>
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => logOut()}
                  style={{cursor: 'pointer'}}
                ><BiLogOut size={35}
                           color={'#E30914'}/></NavLink>
              </div>
              :
              <div>
                <NavLink
                  to={'/login'}
                  style={{cursor: 'pointer'}}
                ><BiLogIn size={35}
                          color={'#E30914'}/></NavLink>
              </div>
            }
            <div className={style.items}>
              <NavLink to={'/'}>Home</NavLink>
              <p
                onClick={onClickMovieHandler}>Movies {isMoviesOpen ? <AiOutlineEyeInvisible size={20}/> :
                <AiOutlineEye size={20}/>} </p>
              {isMoviesOpen && <div>{links}</div>}
              <p
                onClick={onClickGenreHandler}>Genres {isGenreOpen ? <AiOutlineEyeInvisible size={20}/> :
                <AiOutlineEye size={20}/>}</p>
              {isGenreOpen && <div>{genres}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;