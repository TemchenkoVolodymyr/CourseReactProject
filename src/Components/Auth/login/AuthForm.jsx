import React, {useState} from 'react';
import styles from './AuthForm.module.scss'
import {useForm} from "react-hook-form";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "../../../redux/store/user/userSlice";
import {useNavigate} from "react-router";
import {useAuth} from "../../../hooks/useAuth";

const AuthForm = () => {
  const {isAuth} = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    mode: "onChange"
  })

  const loginHandler = ({email, password}) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken
        }))
        navigate('/')

        console.table(isAuth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
    reset()
  }

  const registerHandler = ({email, password}) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken
        }))
        navigate('/')

        console.table(user);
      })
      .catch((error) => {
        let errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use. Please try another one.'
        } else {
          errorMessage = error.message
        }
        setError(errorMessage);
      });
    reset()
  }

  const onSubmit = () => {
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
        {errors.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
        <label htmlFor="userName">password</label>
        <input
          {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should contain more then 6 characters '
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Password should contain at least one letter and one number'
              }
            }
          )}
          type="password"
          placeholder='Enter your password'
        />
        {errors.password && <div className={styles.errorMessage}>{errors.password.message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.btnContainer}>
          <button
            className={styles.active}
            type='button'
            onClick={handleSubmit(loginHandler)}
          >Login
          </button>
          <button
            onClick={handleSubmit(registerHandler)}
            type='button'>Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;