import React, {useState} from 'react';
import styles from './AuthForm.module.scss'
import {useForm} from "react-hook-form";
import {useAuthRedirect} from "../useAuthRedirect";
import {useAuth} from "../../../hooks/useAuth";

const AuthForm = () => {
  useAuthRedirect()

  const {isLoading} = useAuth()
  const [ type, setType] = useState('login')

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    mode: "onChange"
  })

  const login = (data) => {
    console.table(data)
  }

  const registration = (data) => {
    console.table(data)
  }

  const onSubmit = (data) => {
    if (type === 'login') login(data)
    else if (type === 'register') registration(data)
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
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: 'Please enter a valid email '
              }
            }
          )}
          type="text"
          placeholder='Enter your email'
        />
        {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
        <label htmlFor="userName">password</label>
        <input
          {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'password should contain more then 6 characters '
              },
            }
          )}
          type="password"
          placeholder='Enter your password'
        />
        {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
        <div className={styles.btnContainer}>
          <button
            onClick={() => setType('login')}
            disabled={isLoading}
            className={styles.active}
            type='submit'
          >Login
          </button>
          <button
            onClick={() => setType('register')}
            disabled={isLoading}
            type='submit'>Register</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;