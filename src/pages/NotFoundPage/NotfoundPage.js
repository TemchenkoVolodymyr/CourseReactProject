import React from 'react';
import style from './NotfoundPage.module.scss';
import { Link } from 'react-router-dom';

const NotfoundPage = () => {
  return (
      <div className={style.notFound}>
          <h1>This page doesnt exist. Go <Link to={'/'}>home</Link></h1>
      </div>
  );
};

export default NotfoundPage;