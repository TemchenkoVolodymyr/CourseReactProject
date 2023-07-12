import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { setIsAuth, setUser } from '../../redux/backend/userBackendSlice';
import { login, registration } from '../../http/userAPI';
import { useForm } from 'react-hook-form';
import styles from '../../Components/Auth/AuthForm.module.scss';
import RegisterForm from '../../Components/Auth/RegisterForm';
import LoginForm from '../../Components/Auth/LoginForm';


const AuthPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: 'onSubmit'
  });

  const onSubmit = async (data) => {
    const { email, password, userName } = data;
    reset();
    
    try {
      let user;
      if (isLogin) {
        user = await login(email, password);
      } else {
        user = await registration(email, password, userName);
      }
      dispatch(setUser(user));
      dispatch(setIsAuth(true));
      navigate('/');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>Auth Page</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className={styles.wrapperBox}>
        <h1>{isLogin ? 'Login' : 'Registration'}</h1>
        {isLogin ? (
            <LoginForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
            />

        ) : (
          <RegisterForm
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            watch={watch}
          />
        )}
      </section>
    </>

  );
};

export default AuthPage;