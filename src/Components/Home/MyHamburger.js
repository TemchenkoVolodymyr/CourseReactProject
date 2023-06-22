import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './MyHamburger.module.scss';


const MyHamburger = (props) => {

  const { title, items } = props;
  const [modal, setModal] = useState(false);
  const [styleModal, setStyleModal] = useState();

  const [isActive,setIsActive] = useState(false);

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
        top:0,
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


const changeActive = () => {
  document.body.classList.toggle('lock');
  setIsActive(!isActive);
}
  const links = items.map((item) => <NavLink  to={item.to}>{item.name}</NavLink>);

  return (
    <div className={style.container}>
      {/*<p className={style.openModal} onClick={openModal}>{title}</p>*/}
      <div className={`${style.headerBurger} ${isActive ? style.active : null}`} onClick={changeActive}>
        <span></span>
        <div className={style.menu}>
          <ul className={style.items}  style={styleModal}>
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyHamburger;