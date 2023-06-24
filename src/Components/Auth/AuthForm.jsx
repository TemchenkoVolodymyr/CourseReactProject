import React, { useState } from 'react';
import styles from './AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../redux/slices/userSlice';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router';

const AuthForm = () => {
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const toggleFormMode = () => {
    setIsRegister(!isRegister);
  };

  const registerHandler = ({ userName, email, password }) => {

    dispatch(registerUser({ userName, email, password }))
      .then((action) => {
        if (registerUser.fulfilled.match(action)) {
          navigate('/');
        } else if (registerUser.rejected.match(action)) {
          if (action.payload) {
            setError(action.payload.message);
          } else {
            setError(action.error.message);
          }
        }
      });
  };

  const loginHandler = ({ email, password }) => {
    dispatch(loginUser({ email, password }))
      .then((action) => {
        if (loginUser.fulfilled.match(action)) {
          navigate('/');
        } else if (loginUser.rejected.match(action)) {
          if (action.payload) {
            setError(action.payload.message);
          } else {
            setError(action.error.message);
          }
        }
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: 'onChange'
  });
  const onSubmit = () => {
    reset();
  };

  return (
    <section className={styles.wrapperBox}>
      <h1>Auth</h1>
      {isRegister ? (
        <RegisterForm
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          error={error}
          registerHandler={registerHandler}
          toggleFormMode={toggleFormMode}
          watch={watch}

        />
      ) : (
        <LoginForm
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          error={error}
          loginHandler={loginHandler}
          toggleFormMode={toggleFormMode}
        />
      )}
    </section>
  );
};

export default AuthForm;