import React, {useState} from 'react';
import styles from './AuthForm.module.scss'
import {useForm} from "react-hook-form";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slices/userSlice";
import {useNavigate} from "react-router";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

const AuthForm = () => {
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
      .then(async ({user}) => {
        // Get an instance of Firestore
        const db = getFirestore();

        // Retrieve the user document
        const userDoc = await getDoc(doc(db, "users", user.uid));

        // Fetch user data
        const userData = userDoc.data();

        // УSet user data in Redux
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          admin: userData.admin || false
        }))
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          errorMessage = 'User not found. Please register.'
        }
        setError(errorMessage);
      });
    reset()
  }


  const registerHandler = async ({email, password}) => {
    const auth = getAuth();
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);

      const db = getFirestore();

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        date: new Date().toLocaleDateString(),
        admin: false,

      });

      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        admin: false
      }));

      navigate('/');
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please try another one.'
      }
      setError(errorMessage);
    }
    reset();
  }

  const onSubmit = () => {
    reset()
  }

  return (
    <section className={styles.wrapperBox}>
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