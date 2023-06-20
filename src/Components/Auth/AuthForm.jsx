import React, { useState } from 'react';
import styles from './AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import Form from './Form';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const toggleFormMode = () => {
    setIsRegister(!isRegister);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange'
  });
  const loginHandler = ({ email, password }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        // Get an instance of Firestore
        const db = getFirestore();

        // Retrieve the user document
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        // Fetch user data
        const userData = userDoc.data();

        // УSet user data in Redux
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          admin: userData.admin || false
        }));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          errorMessage = 'User not found. Please register.';
        }
        setError(errorMessage);
      });
    reset();
  };


  const registerHandler = async ({ userName, email, password }) => {
    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      const db = getFirestore();

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        date: new Date().toLocaleDateString(),
        admin: false,
        userName: userName
      });

      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        admin: false,
        userName: userName
      }));

      navigate('/');
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please try another one.';
      }
      setError(errorMessage);
    }
    reset();
  };

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