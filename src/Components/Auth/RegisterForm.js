import React from 'react';
import styles from './AuthForm.module.scss';


const RegisterForm = ({handleSubmit, register, errors, error, registerHandler, toggleFormMode, watch}) => {

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');


  const handleRegisterClick = (e) => {
    e.preventDefault();
    handleSubmit(registerHandler)();
  };
  return (
    <form onSubmit={handleSubmit(registerHandler)}>
      <label htmlFor="userName">User Name</label>
      <input
        {...register('userName', {
            required: 'User Name is required',
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: 'Please enter a valid user name without spaces (e.g., john_doe)',
            },
          }
        )}
        type="text"
        placeholder="Enter user name"
      />
      {errors.userName && <div className={styles.errorMessage}>{errors.userName.message}</div>}
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
      <label htmlFor="confirmPassword">confirm password</label>
      <input
        {...register('confirmPassword', {
            required: 'Required field',
            validate: (value) => value === password || 'Passwords do not match',
          }
        )}
        type="password"
        placeholder="Confirm your password"
      />
      {errors.confirmPassword &&
        <div className={styles.errorMessage}>{errors.confirmPassword.message}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.btnContainer}>
        <button type="button" onClick={toggleFormMode}>Login</button>
        <button type="button" className={styles.active} onClick={handleRegisterClick}>Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;