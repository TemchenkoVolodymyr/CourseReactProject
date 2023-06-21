import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './MyHamburger.module.scss';


const MyHamburger = (props) => {

  const { title, items } = props;
  const [modal, setModal] = useState(false);
  const [styleModal, setStyleModal] = useState();

  const openModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal === false) {
      setStyleModal({
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: '1001',
        opacity: 0,
      });
    } else {
      setStyleModal({
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: '1001',
        opacity: 1,
      });
    }
  }, [modal]);

  const closeTheModal = () => {
    console.log('s');
    setModal(false);
  };

  const links = items.map((item) => <NavLink  to={item.to}>{item.name}</NavLink>);

  return (
    <div className={style.container} onBlur={closeTheModal}>
      <p className={style.openModal} onClick={openModal}>{title}</p>
      <div onBlur={closeTheModal} className={style.test} >
      <ul className={style.items}  style={styleModal}>
        {links}
      </ul>
      </div>
    </div>
  );
};

export default MyHamburger;