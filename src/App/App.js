import React, { useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import RoutersCollection from './RoutersCollection/RoutersCollection';
import { setIsAuth, setUser } from '../redux/backend/userBackendSlice';
import { check } from '../http/userAPI';


function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then((data) => {
        dispatch(setUser(data));
        dispatch(setIsAuth(true));
      })
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return <>Loading</>;
  }

  return (

    <>
      <RoutersCollection/>
    </>

  );
}


export default App;