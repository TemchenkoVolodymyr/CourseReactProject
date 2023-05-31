import React, {useState} from 'react';
import styles from './AuthForm.module.scss'
import {useForm} from "react-hook-form";

const AuthForm = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    mode: "onChange"
  })

  const onSubmit = (data) => {
    alert(`${data.email}`)
    reset()
  }

  return (
    <section className={styles.wrapper}>
      <h1>Auth</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">e-mail</label>
        <input
          {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                message: 'Please enter a valid email '
              }
            }
          )}
          type="text"
          placeholder='Enter your email'
          name='userName'
        />
        {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
        <label htmlFor="userName">password</label>
        <input
          {...register('password', {
              required: 'Password is required',
            pattern: {
              minLength: 6,

              message: 'password should contain more then 6 characters '
            }
            }
          )}
          type="password"
          placeholder='Enter your password'
        />
        {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
        <div className={styles.btnContainer}>
          <button className={styles.active}
            type='submit'
          >Login
          </button>
          <button type='submit'>Register</button>
        </div>

      </form>
    </section>
  );
};

export default AuthForm;