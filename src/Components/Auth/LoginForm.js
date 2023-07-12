import React, { useEffect, useRef } from 'react';
import styles from './AuthForm.module.scss';
import { useNavigate } from 'react-router';

const LoginForm = ({ handleSubmit, register, errors, error, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">e-mail</label>
      <input
        {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: 'Please enter a valid email '
            }
          }
        )}
        type="text"
        placeholder="Enter your email"
      />
      {errors.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
      <label htmlFor="password">password</label>
      <input
        {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should contain more than 6 characters '
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'Password should contain at least one letter and one number'
            }
          }
        )}
        type="password"
        placeholder="Enter your password"
      />
      {errors.password &&
        <div className={styles.errorMessage}>{errors.password.message}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.btnContainer}>
        <button
          className={styles.active}
          type="submit"
        >Login
        </button>
        <button type="button" onClick={() => navigate('/register')}>Register</button>
      </div>
    </form>
  );
};

export default LoginForm;