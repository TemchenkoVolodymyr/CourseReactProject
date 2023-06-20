import React from 'react';
import styles from './AuthForm.module.scss';
const RegisterForm = (props) => {
  const { handleSubmit, register, errors, error, registerHandler, toggleFormMode } = props;
  const handleRegisterClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleSubmit(registerHandler)();
  };
  return (
    <form onSubmit={handleSubmit(registerHandler)}>
      <label htmlFor="userName">User Name</label>
      <input
        {...register('userName', {
            required: 'User Name is required',
          }
        )}
        type="text"
        placeholder="Enter user name"
      />
      {errors.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
      <label htmlFor="userName">e-mail</label>
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
      <label htmlFor="userName">password</label>
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
        <button type="button" onClick={toggleFormMode}>Login</button>
        <button type="button" className={styles.active} onClick={handleRegisterClick}>Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;