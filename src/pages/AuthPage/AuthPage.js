import React from 'react';
import AuthForm from '../../Components/Auth/AuthForm';
import {Helmet} from "react-helmet";


const AuthPage = () => {

  return (
    <>
      <Helmet>
        <title>Auth Page</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <AuthForm/>
    </>

  );
};

export default AuthPage;