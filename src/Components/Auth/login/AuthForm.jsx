import React, {useState} from 'react';
import styles from './AuthForm.module.scss'
import {useForm} from "react-hook-form";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "../../../redux/slices/userSlice";
import {useNavigate} from "react-router";
import {useAuth} from "../../../hooks/useAuth";
import {getFirestore, doc, setDoc,getDoc} from "firebase/firestore";
import Form from "./Form";

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
      .then(async ({user}) => {
        // Получите экземпляр Firestore
        const db = getFirestore();

        // Получите документ пользователя
        const userDoc = await getDoc(doc(db, "users", user.uid));

        // Получите данные пользователя
        const userData = userDoc.data();

        // Установите данные пользователя в Redux
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          admin: userData.admin || false // Получите значение admin из Firestore, или установите false, если оно не установлено
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


  const registerHandler = async ({ email, password }) => {
    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Получите экземпляр Firestore
      const db = getFirestore();

      // Создайте новый документ в коллекции 'users'
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        date: new Date().toLocaleDateString(),
        admin: false,

        // другая информация о пользователе
      });

      // Установите данные пользователя в Redux
      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        admin: false
      }));

      // Перенаправьте пользователя на главную страницу
      navigate('/');
    }
    catch (error) {
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
      <Form submit={handleSubmit} onSubmit={onSubmit}
            register={register} errors={errors}
            error={error} registerHandler={registerHandler}
            loginHandler={loginHandler}>
      </Form>
    </section>
  );
};

export default AuthForm;