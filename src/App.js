import './App.css';
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./router/Layout";
import ReduxTestCounter from './Components/reduxTestCounter/ReduxTestCounter';
import axios from "axios";
import {connect, useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {jsonAC} from "./redux/json/jsonActions";

import data from "./redux/json/Data.json"


function App() {


  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(jsonAC(data))
  },[data])


  let x = useSelector((store) => store.jsonDataMedia)
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="discovery" element={<Header/>}/>
          <Route path="redux" element={<ReduxTestCounter/>}/>
        </Route>
      </Routes>
    </>
  );
}


export default App;
