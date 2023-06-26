import React from 'react';
import style from './NotfoundPage.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotfoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Not Found Page</title>
        <meta name="robots" content="noindex, follow"/>
      </Helmet>
      <div className={style.notFound}>
        <h1>This page doesnt exist. Go <Link to={'/'}>home</Link></h1>
      </div>
    </>
  );
};

export default NotfoundPage;